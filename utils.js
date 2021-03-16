export const formatData = (data) => {
    let finalData = {
        labels: [],
        datasets: [
            {
                label: "Preço",
                data: [],
                backgroundColor: "rgb(255, 99, 132, 0.8)",
                borderColor: "rgba(255, 99, 132, 0.2)",
                fill: false
            }
        ]
    };

//Faz a conversão de dats para o formato "dd/mm/aaaa"
    let dates = data.map((val) => {
        const ts = val[0];
        let date = new Date(ts * 1000);
        let dia = date.getDate();
        let mes = date.getMonth() + 1;
        let ano = date.getFullYear();

        let final = '${dia}-${mes}-${ano}';
        return final;
    });

//Retorna o preço específico do dia
    let priceArr = data.map((val) => {
        return val[4];
    });

//Deixa o array de preço em ordem cronológica
    priceArr.reverse();

//Deixa o array de datas em ordem cronológica
    dates.reverse();

    finalData.labels = dates;

    finalData.datasets[0].data = priceArr;

    return finalData;
};