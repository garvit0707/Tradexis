import mongoose from "mongoose";

const StockSchema = new mongoose.Schema(
  {
    symbol: {
        type: String,
        required: true,
        unique: true,
    },  
    companyName: {
        type: String,
        required: true,
    },
    iconUrl: {
        type: String,    
        required: true,    
    },
    lastDayTradePrice: {
        type: Number,
        required: true, 
    },
    currentPrice: {
        type: Number,
        required: true,
    },  
    dayTimeSeries: {
        type: [Object],
        default: [],
    },  
    tenMinTimeSeries: {
        type: [Object],
        default: [],
    },  
    },  
    { timestamps: true }
);

// export default mongoose.model("Stock", StockSchema);
const Stock = mongoose.model("Stock", StockSchema);
export default Stock;