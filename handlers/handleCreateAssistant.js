const fs = require("fs");
const path = require("path");
const { openAi } = require("../utils/instances");
const { createAssistantInstructions } = require("../utils/static");
const { tools } = require("../tools");

const handleCreateAssistant = async (threadId) => {
  const assistantFilePath = path.join(__dirname, "../utils/assistant.json");

  if (fs.existsSync(assistantFilePath)) {
    const assistantData = JSON.parse(
      fs.readFileSync(assistantFilePath, "utf8")
    );
    console.log("Loaded existing assistant ID.");
    return assistantData.assistant_id;
  } else {
    const assistantResponse = await openAi.post(
      "https://api.openai.com/v1/assistants",
      {
        instructions: createAssistantInstructions,
        model: "gpt-3.5-turbo-1106",
        tools,
      }
    );

    const assistantId = assistantResponse.data.id;

    fs.writeFileSync(
      assistantFilePath,
      JSON.stringify({ assistantId, threadId }, null, 2)
    );
    console.log("Created a new assistant and saved the ID.");
    return assistantId;
  }
};

module.exports = { handleCreateAssistant };
