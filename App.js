import Dashboard from "./components/Dashboard";
import { formatData } from "./utils";
import "/styles.css";
import React, { useEffect, useRef, useState } from "react";


export default function App(){
const  [moedas, setmoedas] = useState([]);
const  [pares, setpares] = useState("");
const  [preco, setpreco] = useState("0.00");
const  [dataPassada, setdataPassada] = useState({});
const webs = useRef(null);
let first = useRef(false);
const url = "https://api.pro.coinbase.com";

useEffect(() => {
    webs.current = new WebSocket("wss://ws-feed.pro.coinbase.com");

    let pares = [];

    const apiCall = async () => {
        await fetch(url + "/products")
        .then((res) => res.json())
        .then((data) => pares = data);


    let filtered = pares.filter((pares) => {
        if (pares.quote_currency === BRL) {
            return pares;
        }
    });

    filtered = filtered.sort((a,b) => {
        if (a.base_moeda < b.base_moeda) {
            return -1;
        }
        if (a.base_moeda < b.base_moeda) {
            return -1;
        }
        return 0;
    });

    setmoedas(filtered);

    first.current = true;
};

    apiCall()
},[])


useEffect (() => {
    if (!first.current){
        return;
    }

    let msg = {
        type: "inscreva-se",
        products_ids: [pair],
        channels: ["ticker"]
    }

    let jsonMsg = JSON.stringify(msg);
    webs.current.send(jsonMsg);

    let historicalDataUrl = '${url}/products/${pair}/candles?granularity=86400';
    const fetchHistoricalData = async () => {
        let dataArr = [];
        await fetch(historicalDataUrl)
        .then((res) => res.json())
        .then((data) => (dataArr = data));

        let formattedData = formatData(dataArr);
        setdataPassada(formattedData);
    };

    fetchHistoricalData();

    webs.current.omessage = (e) => {
        let data = JSON.parse(e.data);
        if(data.type !== "ticker") {
            return;
        }

        if (data.product_id === pares) {
            setpreco(data.preco); 
        }
    };


}, [pares]);

const handleSelect = (e) => {
    let unsubMsg = {
        type: "Remover inscrição",
        prduct_ids: [pares],
        channels: ["ticker"]
    };
    let unsub = JSON.stringify(unsubMsg);

    webs.current.send(unsub);

    setpares(e.target.value);
};
return (
    <div className="container">
        {
            <select name="moeda" value={pares} onChange={handleSelect}>
                {moedas.map((cur, idx) => {
                    return (
                        <option key={idx} value={cur.id}>
                            {cur.display.name}
                            </option>
                    );
                })}
            </select>
        }
        <Dashboard preco={preco} data={dataPassada} />
    </div>
)
}

