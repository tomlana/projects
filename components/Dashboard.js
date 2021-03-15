import { Line } from "react-chartjs-2";

function Dashboard ({ preco, data}) {
    const opts = {
        tooltips:{
            intersect: false,
            mode: "index"
        },
        responsive: true,
        maintainAspectRatio: false
    };
    if(preco === "0.00") {
        return <h2>Selecione duas moedas para fazer a comparação</h2>;
    }

    return (
        <div className="dashboard">
            <h2>{'$${preco}'}</h2>

            <div className="chart-container">
                <Line data={data} options={opts} />

            </div>
        </div>
    );
}

export default Dashboard;