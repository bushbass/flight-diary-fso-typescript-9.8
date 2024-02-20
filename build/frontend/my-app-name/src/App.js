"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
require("./App.css");
const axios_1 = __importDefault(require("axios"));
function App() {
    const [date, setDate] = (0, react_1.useState)('');
    const [weather, setWeather] = (0, react_1.useState)('');
    const [visibility, setVisibility] = (0, react_1.useState)('');
    const [comment, setComment] = (0, react_1.useState)('');
    const [diaries, setDiaries] = (0, react_1.useState)([]);
    const [inputError, setInputError] = (0, react_1.useState)('');
    (0, react_1.useEffect)(() => {
        axios_1.default
            .get('http://localhost:3000/api/diaries/')
            .then((response) => {
            console.log(response.data);
            setDiaries(response.data);
        });
    }, []);
    const createDiary = (event) => {
        setInputError('');
        event.preventDefault();
        const diaryEntryToAdd = {
            date,
            weather,
            visibility,
            comment,
        };
        axios_1.default
            .post('http://localhost:3000/api/diaries/', diaryEntryToAdd)
            .then(function (response) {
            setDiaries([...diaries, response.data]);
            setWeather('');
            setDate('');
            setVisibility('');
            setComment('');
        })
            .catch((error) => {
            setInputError(error.response.data);
        });
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "Add Diary Entry" }), inputError ? (0, jsx_runtime_1.jsx)("p", { children: inputError }) : null, (0, jsx_runtime_1.jsxs)("form", { onSubmit: createDiary, children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: 'date', children: "date" }), ' ', (0, jsx_runtime_1.jsx)("input", { type: 'date', id: 'date', value: date, onChange: (event) => setDate(event.target.value) }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("label", { htmlFor: 'weather', children: "weather" }), ' ', (0, jsx_runtime_1.jsxs)("select", { value: weather, name: 'weather', id: 'weather', onChange: (event) => setWeather(event.target.value), children: [(0, jsx_runtime_1.jsx)("option", { value: '' }), (0, jsx_runtime_1.jsx)("option", { value: 'sunny', children: "Sunny" }), (0, jsx_runtime_1.jsx)("option", { value: 'rainy', children: "Rainy" }), (0, jsx_runtime_1.jsx)("option", { value: 'cloudy', children: "Cloudy" }), (0, jsx_runtime_1.jsx)("option", { value: 'stormy', children: "Stormy" }), (0, jsx_runtime_1.jsx)("option", { value: 'windy', children: "Windy" })] }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("label", { htmlFor: 'visibility', children: "visibility" }), ' ', (0, jsx_runtime_1.jsxs)("select", { value: visibility, name: 'visibility', id: 'visibility', onChange: (event) => setVisibility(event.target.value), children: [(0, jsx_runtime_1.jsx)("option", { value: '' }), (0, jsx_runtime_1.jsx)("option", { value: 'great', children: "Great" }), (0, jsx_runtime_1.jsx)("option", { value: 'good', children: "Good" }), (0, jsx_runtime_1.jsx)("option", { value: 'ok', children: "Ok" }), (0, jsx_runtime_1.jsx)("option", { value: 'poor', children: "Poor" })] }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("label", { htmlFor: 'comment', children: "comment" }), ' ', (0, jsx_runtime_1.jsx)("input", { id: 'comment', type: 'text', value: comment, onChange: (event) => setComment(event.target.value) }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("button", { type: 'submit', children: "add" })] }), diaries.map((entry) => {
                return ((0, jsx_runtime_1.jsxs)("div", { children: ["ID - ", entry.id, (0, jsx_runtime_1.jsx)("br", {}), "Date: ", entry.date, (0, jsx_runtime_1.jsx)("br", {}), "Weather - ", entry.weather, (0, jsx_runtime_1.jsx)("br", {}), "Visibility - ", entry.visibility, (0, jsx_runtime_1.jsx)("br", {}), "comment: ", entry.comment] }, entry.id));
            })] }));
}
exports.default = App;
