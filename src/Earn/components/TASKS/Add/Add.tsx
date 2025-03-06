import { useEffect, useState } from 'react'
import { useUHSWallet } from '../../../earnStore/UHSWallet';
import { useAuth, useUserData } from '../../../../store/main';
import { useUhsTasks } from '../../../earnStore/uhstasks';

const curr = {
    "UHS": "UHS",
    "USD₮": "USDT",
}

export const Add = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [currency, setCurrency] = useState("UHS");
    const [price, setPrice] = useState(1);
    const [executions, setExecutions] = useState(500); // Минимум 500
    const [src, setSrc] = useState("");

    const [haveMoney, setHaveMoney] = useState(0);
    const [checkChannel, setCheckChannel] = useState(false);

    const [err, setErr] = useState("");

    const externalId = useUserData(state => state.user.id)
    const lang = useUserData(state => state.user.languageCode)
    const userId = useAuth(state => state.userId)


    const assets = useUHSWallet(state => state.assets)
    const { checkBotState, isLoadingAdd, checkBot, addTask } = useUhsTasks(state => state)

    // Функция для расчета баланса
    const calculateBalance = (price, executions, currency) => {
        const commission = currency === "UHS" ? 1 : 0.01;
        return executions * (price + commission);
    };

    // Баланс вычисляется автоматически
    const balance = calculateBalance(price, executions, currency);

    const handleCurrencyChange = (e) => {
        const newCurrency = e.target.value;
        setCurrency(newCurrency);
        const newPrice = newCurrency === "UHS" ? 1 : 0.01;
        setPrice(newPrice);
    };

    const handlePriceChange = (e) => {
        const newPrice = parseFloat(e.target.value);
        if (!isNaN(newPrice) && newPrice >= (currency === "UHS" ? 1 : 0.01)) {
            setPrice(newPrice);
        } else {
            setErr('Price incorrect')
        }
    };

    const handleExecutionsChange = (e) => {
        const newExecutions = parseInt(e.target.value, 10);
        if (!isNaN(newExecutions) && newExecutions >= 500) {
            setExecutions(newExecutions);
        } else {
            setErr('Tasks amount incorrect')
        }
    };

    /* const handleSubmit = (e) => {
        e.preventDefault();
        //onSubmit({ title, description, currency, price, executions, balance, src });
        console.log(title, description, currency, price, executions, balance, src)
    }; */

    useEffect(() => {
        const asset = assets.find(a => curr[a.jetton.symbol] === currency);
        setHaveMoney(asset ? Number(asset.balance) / 10 ** asset.jetton.decimals : 0);

        if (!title) {
            setErr("Title is required");
            return
        } else {
            setErr("");
        }

        if (!description) {
            setErr("Description is required");
            return
        } else {
            setErr("");
        }

        if (haveMoney < balance) {
            setErr("Insufficient funds");
            return
        } else {
            setErr("");
        }

        if (!src) {
            setErr("Telegram link on your channel is required");
            return
        } else {
            setErr("");
        }

        if (!checkChannel) {
            setErr(`Add the bot @youhold_bot to your channel and click "Check"`);
            return
        } else {
            setErr("");
        }
    }, [assets, currency, title, description, src, checkChannel, haveMoney, balance])

    const CheckBotInChannel = async (e) => {
        e.preventDefault();
        checkBot(5531877002, src);
        console.log('isOk bot in channel: ', externalId, src)
    }

    const addTaskZ = (e) => {
        e.preventDefault();
        if (userId) {
            addTask(userId, title, description, currency, price, executions, balance, src)
        }
        //console.log(userId, title, description, currency, price, balance, src)
    }

    useEffect(() => {
        setCheckChannel(checkBotState);
    }, [checkBotState])

    return (
        <div style={{ overflowY: 'auto', marginBottom: '5rem' }}>
            <form
                //onSubmit={handleSubmit}
                style={{ padding: "1rem", /* border: "1px solid #ccc",  */borderRadius: "8px", boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)", /* maxWidth: "400px", */ margin: "0 auto" }}
            >
                <div style={{ marginBottom: "1rem" }}>
                    <label style={{ display: "block", marginBottom: "0.3rem", fontWeight: "bold" }}>Title (max 32 chars)</label>
                    <input
                        type="text"
                        value={title}
                        maxLength={32}
                        onChange={(e) => setTitle(e.target.value)}
                        style={{ width: "85vw", padding: "0.5rem", border: "1px solid #ccc", borderRadius: "0.3rem" }}
                        required
                    />
                </div>

                <div style={{ marginBottom: "0.5rem" }}>
                    <label style={{ display: "block", marginBottom: "0.3rem", fontWeight: "bold" }}>Description (max 75 chars)</label>
                    <input
                        type="text"
                        value={description}
                        maxLength={75}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{ width: "85vw", padding: "0.5rem", border: "1px solid #ccc", borderRadius: "0.3rem" }}
                        required
                    />
                </div>

                <div style={{ marginBottom: "0.5rem" }}>
                    <label style={{ display: "block", marginBottom: "0.3rem", fontWeight: "bold" }}>Currency</label>
                    <select
                        value={currency}
                        onChange={handleCurrencyChange}
                        style={{ width: "85vw", padding: "8px", border: "1px solid #ccc", borderRadius: "0.3rem" }}
                    >
                        <option value="UHS">UHS</option>
                        <option value="USDT">USDT</option>
                    </select>
                </div>

                <div style={{ marginBottom: "12px" }}>
                    <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>Price (autofees 1 cent / 1 uhs)</label>
                    <input
                        type="number"
                        value={price}
                        min={currency === "UHS" ? 1 : 0.01}
                        step={currency === "UHS" ? 1 : 0.01}
                        onChange={handlePriceChange}
                        style={{ width: "85vw", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
                        required
                    />
                </div>

                <div style={{ marginBottom: "12px" }}>
                    <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>How many tasks (min 500)</label>
                    <input
                        type="number"
                        value={executions}
                        min={500}
                        step={1}
                        onChange={handleExecutionsChange}
                        style={{ width: "85vw", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
                        required
                    />
                </div>

                <div style={{ marginBottom: "12px" }}>
                    <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>Cost (You have {haveMoney.toFixed(2)} {currency}):</label>
                    <input
                        type="number"
                        value={balance.toFixed(2)}
                        style={{ width: "85vw", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", backgroundColor: "#f3f3f3" }}
                        disabled
                    />
                </div>

                <div style={{ marginBottom: "12px" }}>
                    <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>Telegram Channel Link (example: @youhold)</label>
                    <input
                        type="text"
                        value={src}
                        onChange={(e) => setSrc(e.target.value)}
                        style={{ width: "85vw", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
                        required
                    />
                </div>

                <div style={{ display: 'flex', marginTop: '1rem' }}>
                    <p style={{ textAlign: 'left', fontSize: '0.9rem' }}>
                        {lang === 'ru' ? 'Добавьте бота @youhold_bot в свой канал как администратора. Можете забрать у него права, но не удаляйте бота, пока задание присутствует в приложении. Иначе он не сможет проверять выполнение и мы удалим задание без возврата.' : 'Add the @youhold_bot bot to your channel as an administrator. You can take away all its rights, but do not delete the bot while the task is in the App. Otherwise, it will not be able to check the completion and we will delete the task without returning it.'}
                    </p>
                    <div>
                        <button
                            onClick={async (e) => CheckBotInChannel(e)}
                            style={{ height: '4rem', fontSize: '1rem', padding: '0 1rem', backgroundColor: 'rgb(71, 85, 105)', borderRadius: '0.3rem', boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 3px 0px' }}
                        >Check</button>
                        <p>status:</p>
                        <p style={{ marginTop: '0.5rem' }}>{checkChannel ? '✅' : '❌'}</p>
                    </div>
                </div>

                <p style={{ margin: '0.5rem 0.2rem', color: 'red', fontStyle: 'italic', fontSize: '0.9rem' }}>{err}</p>

                <button
                    onClick={(e) => addTaskZ(e)}
                    disabled={err || isLoadingAdd ? true : false}
                    style={{ opacity: err || isLoadingAdd ? '0.5' : '1', width: "70vw", padding: "0.6rem", backgroundColor: "rgb(42,54,73)", color: "#fff", fontSize: '1rem', border: "none", borderRadius: "0.3rem", marginTop: '0.3rem', cursor: "pointer" }}
                >
                    {isLoadingAdd ? '...' : 'Create Task'}
                    <p>Pay: {balance.toFixed(2)} {currency}</p>
                </button>
            </form>
        </div>
    );
}
