import { useEffect } from "react";
import { useLotoStore, LotoRound } from "./store/loto";
import { useAuth } from "../../../store/main";

interface HistoryProps {
    onHistory: () => void;
}

export const History = ({ onHistory }: HistoryProps) => {
    const userId = useAuth(state => state.userId)
    const { history, getHistory, loading } = useLotoStore((state) => ({
        history: state.history,
        getHistory: state.getHistory,
        loading: state.loading,
    }));

    useEffect(() => {
        getHistory();
    }, [getHistory]);

    return (
        <div
            onClick={onHistory}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(0,0,0,0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999,
            }}
        >
            <div
                onClick={e => e.stopPropagation()} // чтобы клик по окну не закрывал
                style={{
                    backgroundColor: "rgb(71, 85, 105)",
                    borderRadius: '0.3rem',
                    padding: '1rem',
                    maxWidth: 600,
                    width: "90%",
                    maxHeight: "80vh",
                    overflowY: "auto",
                    position: "relative",
                    boxShadow: '0px 0px 20px 0px rgb(0 0 0 / 50%)'
                }}
            >
                {/* Кнопка закрытия */}
                <button
                    onClick={onHistory}
                    style={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        background: "transparent",
                        border: "none",
                        fontSize: 20,
                        cursor: "pointer",
                    }}
                >
                    ×
                </button>

                <h2>Loto History</h2>

                {loading && <div>Loading history...</div>}

                {!loading && (!history || history.length === 0) && <div>No history available</div>}

                {!loading && history?.map((round: LotoRound) => {
                    const buyers = round.buyers || {};

                    // билеты текущего пользователя
                    const userTickets = Object.entries(buyers)
                        .filter(([, uid]) => uid === userId)
                        .map(([ticket]) => Number(ticket));

                    // выигрышные билеты текущего пользователя
                    const winningUserTickets = round.winning_tickets
                        ?.map(Number)
                        .filter(ticket => userTickets.includes(ticket)) || [];

                    const prize = (winningUserTickets.length * 1.9).toFixed(2);

                    return (
                        <div
                            key={round.id}
                            style={{
                                border: "1px solid #ccc",
                                borderRadius: 8,
                                padding: 10,
                                marginBottom: 10,
                            }}
                        >
                            <div>
                                <strong>Round #{round.id}</strong> {" "}
                                {round.finished_at ? new Date(round.finished_at).toLocaleString() : "ongoing"}
                            </div>

                            <div style={{ display: "flex", flexWrap: "wrap", marginTop: 5 }}>
                                {Array.from({ length: 12 }).map((_, i) => {
                                    const ticketNumber = i + 1;
                                    const buyerId = buyers[ticketNumber];
                                    const isWinning = round.winning_tickets?.includes(ticketNumber);
                                    const isUserWinning = isWinning && userTickets.includes(ticketNumber);

                                    let backgroundColor = "#fff"; // по умолчанию свободный
                                    if (isUserWinning) backgroundColor = "#4caf50"; // зелёный — выигрышный юзера
                                    else if (isWinning) backgroundColor = "#2196f3"; // синий — выигрышный чужой
                                    else if (buyerId) backgroundColor = "#cccccc"; // серый — куплен другим

                                    return (
                                        <div
                                            key={ticketNumber}
                                            style={{
                                                width: 40,
                                                height: 40,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                margin: 2,
                                                borderRadius: 4,
                                                border: "1px solid #999",
                                                fontSize: 14,
                                                fontWeight: "bold",
                                                backgroundColor,
                                                color: backgroundColor !== "#fff" ? "#fff" : "#000",
                                            }}
                                            title={buyerId ? `Bought by user ${buyerId}` : "Free"}
                                        >
                                            {ticketNumber}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Показываем приз только если у пользователя есть билеты */}
                            {userTickets.length > 0 && (
                                <div style={{ marginTop: 8, fontWeight: "bold" }}>
                                    <p>Your tickets: {userTickets.join(', ')}</p>
                                    <p style={{ color: '#4caf50' }}>You win: ${prize}</p>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
