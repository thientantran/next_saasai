'use client'
import { BotAvatar } from "@/components/BotAvatar"
import Empty from "@/components/Empty"
import Heading from "@/components/Heading"
import Loader from "@/components/Loader"
import UserAvatar from "@/components/UserAvatar"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useProModal } from "@/hooks/useProModal"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { Code } from "lucide-react"
import { useRouter } from "next/navigation"
import { ChatCompletionRequestMessage } from "openai"
import { useState } from "react"
import { useForm } from "react-hook-form"
import ReactMarkdown from "react-markdown"
import * as z from 'zod'
const formSchema = z.object({
  prompt: z.string().min(10, {
    message: "Prompt need more 10 characters"
  })
})
export default function PageCode() {
  const proModel = useProModal()
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([])
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: ""
    }
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatCompletionRequestMessage = { role: 'user', content: values.prompt }
      const newMessages = [...messages, userMessage];
      const response = await axios.post("api/code", {
        messages: newMessages
      });
      setMessages((current) => [...current, userMessage, response.data])
      form.reset()
    } catch (error:any) {
      if(error?.response?.status === 403){
        proModel.onOpen()
      }
    } finally {
      router.refresh()
    }
  }
  return (
    <>
      <Heading title="Code Generation"
        description="Generate code using descriptive text."
        icon={Code}
        iconColor="text-green-700"
        bgColor="bg-green-700/10" />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2'>
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl>
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="Simple toggle button using react hooks?"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}

              />
              <Button className="col-span-12 lg:col-span-2 w-full" type="submit" disabled={isLoading} size='icon'>
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}

          {messages.length === 0 && !isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Empty label="No conversation started." />
            </div>
          )}
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message) => (
              <div key={message.content} className={cn('p-8 w-full flex items-start gap-x-8 rounded-lg', message.role === 'user' ? 'bg-white border border-black/10' : 'bg-muted')}>
                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                <ReactMarkdown components={{
                  pre: ({node, ...props}) => (
                    <div className="overflow-auto w-full my-2 rounded-lg bg-black/10 p-2">
                      <pre {...props}/>
                    </div>
                  ),
                  code: ({node, ...props}) => (
                    <code className="bg-black/10 rounded-lg p-1" {...props}/>
                  )
                }} className="text-sm overflow-hidden leading-7">
                {message.content || ""}
                </ReactMarkdown>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
