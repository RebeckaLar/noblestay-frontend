import { Calendar } from "@/components/ui/calendar"
import { eachDayOfInterval, parse, isPast } from "date-fns"
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod" 
import { useForm } from "react-hook-form"
import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

  import { BadgeCheckIcon, Check, ChevronRightIcon, ChevronsUpDown } from "lucide-react"
 
import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// import { useroom } from "@/contexts/roomContext";
import { useRoom } from "@/contexts/RoomContext";
import { useStay } from "@/contexts/StayContext";

// DEFINING TASK REPETITION-OPTIONS:
const base = z.object({
    title: z.string().nonempty({ message: "Task title is mandatory" }),
    rid: z.string().nonempty({ message: "You need to choose room" }),
    date: z.date(),
    guest: z.string(),
    room: z.object({ id: z.string() }).optional()
})

// const single = base.extend({
//     reoccuring: z.literal("none"),
//     date: z.date(),
// })

// const multiple = base.extend({
//     reoccuring: z.literal("multiple"),
//     dateMultiple: z.array(z.date()).min(1, "Choose at least one date"),
// })

const range = base.extend({
    selectedDates: z.literal("range"),
    dateRange: z.object({
        from: z.date(),
        to: z.date()
    }),
})

const formSchema = z.discriminatedUnion("dateRange", [
    // single,
    // multiple,
    range
])
const AddBooking = () => {
    const [searchParams] = useSearchParams()
    const presetDate = searchParams.get("date")
    const presetroomId = searchParams.get("roomId")
      const [loading, setLoading] = useState(false)
const params = useParams();



    const { actions, room } = useRoom()
    const { stays } = useStay()
    // const { addTask, loading } = useTasks()
    const [submitted, setSubmitted] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    // const router = roomouter()


  //   const stayId = params.id ? Number(params.id) : undefined;
  // const stay = stayId ? actions.getStayByID(stayId) : undefined;

  //     const roomId = params.id ? Number(params.id) : undefined;
  // const room = roomId ? actions.getRoomByID(roomId) : undefined;

  // DEFINING FORM FOR ADDING A TASK:
  const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
        title: "",
        rid: presetroomId ?? "",
        // reoccuring: "none",
        date: presetDate ? parse(presetDate, "yyyy-MM-dd", new Date()) ?? new Date() : new Date(),
      },
    })

      // room CLICKING ON SUBMIT TASK BUTTON:
      async function onSubmit(values: z.infer<typeof formSchema>) {
          const base = {
              title: values.title,
              rid: values.rid,
              date: values.date
          }
    
        try {
            setSubmitted(true) //To avoid spam
        
            // if(values.reoccuring === "none") {
            //   const taskDate = new Date(values.date) //Task date
            //   await addTask({ ...base, date: values.date})
    
            // }
            // if(values.reoccuring === "multiple") {
            //     await Promise.all(
            //         values.dateMultiple.map(d => addTask({ ...base, date: d}))
            //     )
    
            // }
            // if(values.reoccuring === "range") {
            //     const days = eachDayOfInterval({ start: values.dateRange.from, end: values.dateRange.to})
            //     await Promise.all(
            //         days.map(d => addTask({ ...base, date: d}))
            //     )
            // }
        
            form.reset()
            // if(!isModal)
            //   router.push("/")
            // else
            //   router.back()
    
          } catch (error) {
            console.error(error)
            setErrorMessage("Something went wrong, please try again")
            setSubmitted(false)
          }
      }
    


  return (
     <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

      {/* SELECT DATE */}
      {/* <div className="deadline sm:flex sm:justify-center justify-items-center sm:gap-10"> */}
        <FormField
              control={form.control}
              name="dateRange"
              render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel><h6>Select date</h6></FormLabel>
                      <Calendar
                      className="flex w-full items-center justify-center"
                        mode="range"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => isPast(date.setHours(23, 59, 59, 999))}
                    />
                    <FormMessage />
                </FormItem>
              </>
              )}
            />
        {/* </div> */}

        
        {/* SELECT GUESTS */}
        <FormField
          control={form.control}
          name="guest"
          render={({ field }) => (
            <FormItem className="flex w-full max-w-md flex-col gap-6">
              <FormLabel><h6>Select how many guests</h6></FormLabel>
                <Item variant="outline">
                  <ItemContent>
                    <ItemTitle>Basic Item</ItemTitle>
                    <ItemDescription>
                      A simple item with title and description.
                    </ItemDescription>
                  </ItemContent>
                  <ItemActions>
                    <Button variant="outline" size="sm">
                      Action
                    </Button>
                  </ItemActions>
                </Item>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* SELECT ROOM */}
        <FormField
          control={form.control}
          name="rid"
          render={({ field }) => (
            <FormItem className="flex w-full max-w-md flex-col gap-6">
              <FormLabel><h6>Select room</h6></FormLabel>

              <RadioGroup
                value={field.value}
                onValueChange={(val) => field.onChange(val)}
                className="flex flex-col gap-4"
              >
                {room.map((r) => (
                  <div key={String(r.rid)} className="p-3 shadow-md rounded-lg">
                    <div className="flex flex-col justify-between items-center w-full">
                      <div>
                        <h6 className="font-medium">{r.title}</h6>
                        <p className="text-sm text-gray-500">{r.roomCategory}</p>
                        <p className="text-sm p-3">{r.description}</p>
                      </div>

                      <hr className="solid w-full"></hr>
                      
                      <div className="flex justify-between w-full pt-3">
                        <p className="body-small">{String(r.price)} kr / night</p>
                        <div className="flex gap-2">
                          <p className="body-small">Select this room</p>
                          <RadioGroupItem value={String(r.rid)} id={`room-${r.rid}`} className="size-6"/>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </RadioGroup>
              <FormMessage />
            </FormItem>
          )}
        />

            { errorMessage && <p className="text-red-500 text-sm">{ errorMessage }</p>}
            <button
            className="primary-btn"
            disabled={loading || submitted} 
            type="submit">{ loading ? "Reserving..." : "Reserve" }
            </button>
      </form>
    </Form>
  )
}
export default AddBooking