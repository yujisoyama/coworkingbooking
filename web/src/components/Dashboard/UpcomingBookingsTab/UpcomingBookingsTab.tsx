import { useEffect, useState } from "react"
import { IUpcomingBooking } from "../../../@types/Book";
import { api } from "../../../Api";
import { useUser } from "../../../context/UserContext";
import { Loading } from "../Loading";
import { UpcomingBookings } from "./UpcomingBookings";

export const UpcomingBookingsTab = () => {
    const date = new Date();
    const todayDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

    const { user, token } = useUser();
    const [currentBooks, setCurrentBooks] = useState<IUpcomingBooking[]>();
    const [currentBooksLoaded, setCurrentBooksLoaded] = useState<boolean>(false);

    const loadCurrentBooks = async () => {
        setCurrentBooksLoaded(false);
        let timer = setTimeout(async () => {
            await api.get(`/book/upcoming/${user.id}/${todayDate}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).then(res => {
                setCurrentBooks(res.data);
                clearTimeout(timer);
                setCurrentBooksLoaded(true);
            });
        }, 700);
    }

    const cancelBooking = async (bookId: number) => {
        await api.delete(`/book/cancel/${bookId}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).catch(error => {
            console.log(error);
        });
        loadCurrentBooks();
    }

    useEffect(() => {
        loadCurrentBooks();
    }, [])

    return (
        <div>
            <div className="mt-[3%] w-full bg-backgroundLight rounded-xl flex flex-col text-paragraph font-semibold text-lg px-9 py-5">
                {currentBooksLoaded ? (
                    <>
                        {currentBooks?.length ? (
                            <>
                                {currentBooks.map(book => [
                                    <UpcomingBookings id={book.id} key={book.id} type={book.type} booking_number={book.booking_number} booking_day={book.booking_day} period_id={book.period_id} user={user.id} cancelBooking={() => cancelBooking(book.id)} />
                                ])}
                            </>
                        ) : (
                            <div className="flex h-16 justify-center items-center">You don't have current books</div>
                        )}
                    </>
                ) : (
                    <Loading />
                )}
            </div>
        </div>
    )
}
