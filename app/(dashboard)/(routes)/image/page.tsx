'use client'
import { BotAvatar } from "@/components/BotAvatar"
import Empty from "@/components/Empty"
import Heading from "@/components/Heading"
import Loader from "@/components/Loader"
import UserAvatar from "@/components/UserAvatar"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { ImageIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { ChatCompletionRequestMessage } from "openai"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from 'zod'
const formSchema = z.object({
  prompt: z.string().min(10, {
    message: "Photo prompt is required"
  }),
  amount: z.string().min(1),
  resolution: z.string().min(1),
})
const amountOptions = [
  {
    value: "1",
    label: "1 Photo"
  },
  {
    value: "2",
    label: "2 Photos"
  },
  {
    value: "3",
    label: "3 Photos"
  },
  {
    value: "4",
    label: "4 Photos"
  },
  {
    value: "5",
    label: "5 Photos"
  }
];

const resolutionOptions = [
  {
    value: "256x256",
    label: "256x256",
  },
  {
    value: "512x512",
    label: "512x512",
  },
  {
    value: "1024x1024",
    label: "1024x1024",
  },
];
export default function PageImage() {
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([])
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount:'1',
      resolution:'512x512'
    }
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatCompletionRequestMessage = { role: 'user', content: values.prompt }
      const newMessages = [...messages, userMessage];
      const response = await axios.post("api/conversation", {
        messages: newMessages
      });
      setMessages((current) => [...current, userMessage, response.data])
      form.reset()
    } catch (error) {
      console.log(error);
    } finally {
      router.refresh()
    }
  }
  return (
    <>
      <Heading title="Image Generation"
        description="Turn your prompt into an image"
        icon={ImageIcon}
        iconColor="text-pink-700"
        bgColor="bg-pink-700/10" />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2'>
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-6">
                    <FormControl>
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="How do I calculate the radius of a circle?"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}

              />
              <FormField
                control={form.control}
                name='amount'
                render={({field}) => (
                  <FormItem className="col-span-12 lg:col-span-2">
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue defaultValue={field.value}/>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {amountOptions.map((option)=> (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='resolution'
                render={({field}) => (
                  <FormItem className="col-span-12 lg:col-span-2">
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue defaultValue={field.value}/>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {resolutionOptions.map((option)=> (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                    </Select>
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
                {message.content}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
