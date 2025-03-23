import './CurrencyConverter.css';

function CurrencyConverter() {
    return (
        <div className="currency-converter">
            <h2>Convert Currency</h2>
            <form>
                <div>
                    <label>Amount</label>
                    <input type="number" />
                </div>
                <div>
                    <label>From</label>
                    <select></select>
                </div>
                <div>
                    <label>To</label>
                    <select></select>
                </div>
                        
            </form>

            </div>
    )
}

export default CurrencyConverter;
