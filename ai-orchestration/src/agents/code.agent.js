import "dotenv/config"
import { createAgent } from "langchain";
import {ChatMistralAI} from '@langchain/mistralai'
import {listFiles,readFiles,updateFiles} from './tools.js'

const model = new ChatMistralAI({
    model:'ministral-8b-2512',
    apiKey:process.env.MISTRAL_API_KEY
})

const agent = createAgent({
    model,
    tools:[listFiles,readFiles,updateFiles]
})

await agent.invoke({
    messages:[
        {
            role:"user",
            content:"create a snake game in the project "
        }
    ]
})