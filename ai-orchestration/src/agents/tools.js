import axios from "axios";
import { context, tool } from "langchain";
import * as z from 'zod'

export const listFiles = tool(async ({}) => {
    console.log("=====================================================")
    console.log("using list files tool")
    console.log("=====================================================")
  const response = await axios.get(
    "http://01a19bcf-415e-77d3-82c6-812d12a01d58.agent.localhost/list-files",
  );

  console.log("=====================================================")
  console.log("response from list files tool",response.data)
  console.log("=====================================================")

  return JSON.stringify(response.data.files)
},{
     name: "list_files",
    description: "List all the files in project directory .this is useful for understanding what files are available to work with. ",
    schema : z.object({})
});

export const readFiles = tool(async({files})=>{
    console.log("=====================================================")
    console.log("using read files tool")
    console.log("=====================================================")

     const response = await axios.get('http://01a19bcf-415e-77d3-82c6-812d12a01d58.agent.localhost/read-files?files='+files.join(','))

     console.log("=====================================================")
     console.log("response from read files tool ",response.data)
     return JSON.stringify(response.data.files)
    
},{
    name:"Read_files",
    description:"Read the content of specific files . this is usefull for understanding the content of files that are relevant to the task at hand.",
    schema: z.object({
        files:z.array(z.string()).describe("the list of files absolute path to read. these should be files that were listed using the list_files tool or crated later .")
    })
})

export const updateFiles = tool(async({files})=>{
    console.log("=====================================================")
    console.log("user from update files tool")
    console.log("=====================================================")

    const response = await axios.patch("http://01a19bcf-415e-77d3-82c6-812d12a01d58.agent.localhost/update-files",{
        updates:files
    })

    console.log("=====================================================")
    console.log("response from update files tool",response.data)
    console.log("=====================================================")

    return JSON.stringify(response.data.results)
},{
    name:"Update_files",
    description:"Update the content of specified files. this is useful for making changes to files based on the requirements of the task at hand. This tool can also use to create new files by providing a new file name in the file field and the content to be added in the content field.",
    schema:z.object({
        files:z.array(z.object({
            file:z.string().describe("the absolute path of the file to update."),
            content:z.string().describe("the new content for the file")
        })).describe("The list of files to update and their new contents.")

    })
})
