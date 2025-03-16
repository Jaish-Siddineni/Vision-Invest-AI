from flask import Flask, request, jsonify
from ai.model.predict import predict_stock_price

app = Flask(__name__)

@app.route("/predict", methods=["GET"])
def predict():
    stock_symbol = request.args.get("symbol", "AAPL")
    predicted_price = predict_stock_price(stock_symbol)
    
    if predicted_price is not None:
        return jsonify({"stock": stock_symbol, "predicted_price": predicted_price})
    else:
        return jsonify({"error": "Stock data unavailable"}), 404

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
