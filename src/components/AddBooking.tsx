import { Calendar } from "@/components/ui/calendar"
import { isPast } from "date-fns"
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod" 
import { useForm } from "react-hook-form"
import { useState } from "react";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl, //FIX
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"

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
import { useRoom } from "@/contexts/RoomContext";
import { useBooking } from "@/contexts/BookingContext";

// Define the booking data type that matches what we send to BookingReview
// type BookingData = {
//   rid: string;
//   dateRange: { from: Date; to: Date };
//   numberOfGuests: number;
// }; //FIX

// const formSchema = z.object({
//   rid: z.string().nonempty({ message: "You need to choose room" }), //FIX TYPE
//   dateRange: z.object({
//     from: z.date({ message: "Start date is required" }),
//     to: z.date({ message: "End date is required" })
//   }).refine((data) => data.from < data.to, {
//     message: "End date must be after start date",
//     path: ["to"],
//   }),
//   numberOfGuests: z.number().min(1, { message: "At least 1 guest required" }),
// });

function AddBooking() {
  const [searchParams] = useSearchParams();
  const params = useParams();
  const presetroomId = searchParams.get("roomId");
  const presetGuestTypes = searchParams.get('guestType')
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const { room } = useRoom();
  const { setBookingData } = useBooking();
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // DEFINING FORM FOR RESERVING A CASTLE STAY:
  const formSchema = z.object({
    rid: z.string().nonempty({ message: "You need to choose room" }),
    dateRange: z.object({
      from: z.date({ message: "Start date is required" }),
      to: z.date({ message: "End date is required" })
    }).refine((data) => data.from < data.to, {
      message: "End date must be after start date",
      path: ["to"],
    }),
    adults: z.number().min(1, { message: "At least 1 adult required" }),
    children: z.number().min(0).default(0),
    pets: z.number().min(0).default(0),
    guestType: z.enum(["Adult", "Children", "Pets"]).default("Adult"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rid: presetroomId ?? "",
      dateRange: {
        from: new Date(),
        to: new Date(new Date().setDate(new Date().getDate() + 1))
      },
      adults: 1,
      children: 0,
      pets: 0,
      guestType: (presetGuestTypes as GuestCategory) ?? "Adult",
    },
  });

    // CLICKING ON SUBMIT BUTTON:
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("🎉 onSubmit called!", values);
    setLoading(true);
    setErrorMessage(null);
    
    try {
      console.log("Form submitted:", values);
      setSubmitted(true); //To avoid spam
      console.log("success!");
      //MAKE AN API CALL OR SAVE TO LOCAL STORAGE
      
      //Save booking data to context
      //Save booking data to context
      const totalGuests = values.adults + values.children + values.pets;
      setBookingData({
        rid: values.rid,
        dateRange: values.dateRange,
        guestType: values.guestType,
        numberOfGuests: totalGuests,
        adults: values.adults,
        children: values.children,
        pets: values.pets,
        stayId: params.id || ''
      });
      //Navigate to booking review
      navigate('/booking-review');
    } catch (error) {
      console.error("Submission error:", error);
      setErrorMessage("Failed to reserve. Please try again.");
    } finally {
      setLoading(false);
    }
  }
  
  // Pricing derivations
  const selectedRid = form.watch('rid');
  const selectedRoomData = room.find((r) => String(r.rid) === selectedRid);
  const dateRange = form.watch('dateRange');
  const from = dateRange?.from;
  const to = dateRange?.to;
  const msPerDay = 1000 * 60 * 60 * 24;
  const nights = from && to ? Math.max(1, Math.ceil((to.getTime() - from.getTime()) / msPerDay)) : 1;
  const pricePerNight = selectedRoomData ? Number(selectedRoomData.price) : 0;
  const totalPrice = pricePerNight * nights;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col items-center">
        
        
        {/*Debug info remove after testing */}
        <div style={{ background: '#f0f0f0', padding: '10px', fontSize: '12px' }}>
          <strong>Debug Form State:</strong>
          <pre>{JSON.stringify(form.formState.errors, null, 2)}</pre>
          <pre>{JSON.stringify(form.getValues(), null, 2)}</pre>
        </div>

        {/* SELECT DATE */}
        {/* <div className="deadline sm:flex sm:justify-center justify-items-center sm:gap-10"> */}
        <FormField
          control={form.control}
          name="dateRange"
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel><h6 className="h6-brown">Select date</h6></FormLabel>
                <Calendar
                  className="flex w-full items-center justify-center"
                  mode="range"
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) => isPast(date.setHours(23, 59, 59, 999))} />
                <FormMessage />
              </FormItem>
            </>
          )} />
        {/* </div> */}


        {/* SELECT GUESTS */} 
        <div className="flex w-full max-w-md flex-col gap-6">
          <FormLabel><h6 className="h6-brown">Select guests</h6></FormLabel>
          
          {/* Adults */}
          <FormField
            control={form.control}
            name="adults"
            render={({ field }) => (
              <FormItem>
                <Item variant="outline" className="flex">
                  <ItemContent>
                    <ItemTitle className="paragraph">Adults</ItemTitle>
                    <ItemDescription>
                      Ages 13 or above
                    </ItemDescription>
                  </ItemContent>
                  <ItemActions>
                    <Button 
                      type="button"
                      onClick={() => field.onChange(Math.max(1, field.value - 1))} 
                      variant="outline" 
                      size="sm" 
                      className="minus" 
                      aria-label="Decrease adults"
                    > 
                      &#8722;
                    </Button>
                    <Input
                      type="number"
                      className="w-10 items-center"
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      value={field.value}
                      min={1}
                      max={20}
                    />
                    <Button 
                      type="button"
                      onClick={() => field.onChange(field.value + 1)} 
                      variant="outline" 
                      size="sm" 
                      className="plus" 
                      aria-label="Increase adults"
                    > 
                      &#43;
                    </Button>
                  </ItemActions>
                </Item>
                <FormMessage />
              </FormItem>
            )} />

          {/* Children */}
          <FormField
            control={form.control}
            name="children"
            render={({ field }) => (
              <FormItem>
                <Item variant="outline" className="flex">
                  <ItemContent>
                    <ItemTitle className="paragraph">Children</ItemTitle>
                    <ItemDescription>
                      Ages 2-12
                    </ItemDescription>
                  </ItemContent>
                  <ItemActions>
                    <Button 
                      type="button"
                      onClick={() => field.onChange(Math.max(0, (field.value ?? 0) - 1))} 
                      variant="outline" 
                      size="sm" 
                      className="minus" 
                      aria-label="Decrease children"
                    > 
                      &#8722;
                    </Button>
                    <Input
                      type="number"
                      className="w-10 items-center"
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      value={field.value ?? 0}
                      min={0}
                      max={20}
                    />
                    <Button 
                      type="button"
                      onClick={() => field.onChange((field.value ?? 0) + 1)} 
                      variant="outline" 
                      size="sm" 
                      className="plus" 
                      aria-label="Increase children"
                    > 
                      &#43;
                    </Button>
                  </ItemActions>
                </Item>
                <FormMessage />
              </FormItem>
            )} />

          {/* Pets */}
          <FormField
            control={form.control}
            name="pets"
            render={({ field }) => (
              <FormItem>
                <Item variant="outline" className="flex">
                  <ItemContent>
                    <ItemTitle className="paragraph">Pets</ItemTitle>
                    <ItemDescription>
                      Service animals welcome
                    </ItemDescription>
                  </ItemContent>
                  <ItemActions>
                    <Button 
                      type="button"
                      onClick={() => field.onChange(Math.max(0, (field.value ?? 0) - 1))} 
                      variant="outline" 
                      size="sm" 
                      className="minus" 
                      aria-label="Decrease pets"
                    > 
                      &#8722;
                    </Button>
                    <Input
                      type="number"
                      className="w-10 items-center"
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      value={field.value ?? 0}
                      min={0}
                      max={10}
                    />
                    <Button 
                      type="button"
                      onClick={() => field.onChange((field.value ?? 0) + 1)} 
                      variant="outline" 
                      size="sm" 
                      className="plus" 
                      aria-label="Increase pets"
                    > 
                      &#43;
                    </Button>
                  </ItemActions>
                </Item>
                <FormMessage />
              </FormItem>
            )} />
        </div>

        {/* SELECT ROOM */}
        <FormField
          control={form.control}
          name="rid"
          render={({ field }) => (
            <FormItem className="flex w-full max-w-md flex-col gap-6">
              <FormLabel><h6 className="h6-brown">Select room</h6></FormLabel>

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
                          <RadioGroupItem value={String(r.rid)} id={`room-${r.rid}`} className="size-6" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </RadioGroup>
              <FormMessage />
            </FormItem>
          )} />

          {
          errorMessage && 
          <div className="p-3 rounded-lg bg-blue shadow-sm">
            <p className="text-(--error) text-sm">{errorMessage}</p>
            </div>
          }


      <div className="space-y-1 pb-6 w-full">
        {/* <div> */}
          {selectedRoomData ? ( //If user has selected room
              <div className="flex flex-row gap-6 justify-around">
                <div>
                  <p className="paragraph mb-1">Total:</p>
                  <p className="text-(--primary-purple) underline">{totalPrice} SEK</p>
                </div>
            
                <div className="flex flex-col text-center gap-2">
                  <p className="caption text-(--grey)">You will not be charged yet</p>
                  <button
                    className="primary-btn"
                    disabled={loading || submitted}
                    type="submit">{loading ? "Reserving..." : "Reserve"}
                  </button>
                </div>
              </div>
          ) : ( //Else if user has NOT selected room
              <div className="flex flex-row gap-6 justify-around">
                <div>
                  <p className="paragraph mb-1">Total:</p>
                  <p className="caption text-(--grey)">Select a room to see the price</p>
                </div>

                  <div className="flex flex-col text-center gap-2">
                    <p className="caption text-(--grey)">You will not be charged yet</p>
                    <button
                      className="primary-btn"
                      disabled={loading || submitted}
                      type="submit">{loading ? "Reserving..." : "Reserve"}
                    </button>
                  </div>
              </div>
          )}
        {/* </div> */}


        </div>
      </form>
    </Form>
  );
} 
export default AddBooking