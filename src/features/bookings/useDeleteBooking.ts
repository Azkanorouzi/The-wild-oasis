import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useDeleteBooking() {
    const queryClient = useQueryClient();

    const {isLoading: isDeleting, mutate: deleteThisBooking} = useMutation({
        mutationFn: deleteBooking,
        onSuccess: () => {
            toast.success('Booking successfully deleted');
            queryClient.invalidateQueries({ queryKey: ['bookings']})
        },
        onError: (err) => toast.error(err.message) 
    })

    return {isDeleting, deleteThisBooking}
}