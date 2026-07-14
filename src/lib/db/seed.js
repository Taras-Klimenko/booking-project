"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
dotenv_1.default.config({ path: "../../../.env.local" });
var client_1 = require("./client");
var schema_1 = require("./schema");
var mockApartments = [
    {
        id: "1",
        slug: "apartment-1",
        title: "Уютная студия у метро Сокол",
        description: "Светлая студия с современным ремонтом.",
        fullDescription: "Светлая студия с современным ремонтом в 5 минутах от метро Сокол. Полностью оборудованная кухня, стиральная машина, кондиционер, быстрый интернет. Идеально подходит для командировочных и коротких поездок.",
        address: "ул. Примерная, 1",
        metro: "Сокол",
        pricePerNight: 3500,
        images: ["/placeholder-apartment.webp", "/placeholder-apartment.webp", "/placeholder-apartment.webp"],
        amenities: ["Wi-Fi", "Кондиционер", "Стиральная машина", "Кухня", "Парковка"],
        bookedDates: ["2026-07-15", "2026-07-16", "2026-07-17", "2026-07-24"],
    },
    {
        id: "2",
        slug: "apartment-2",
        title: "Квартира рядом с Войковской",
        description: "Просторная однокомнатная квартира, тихий двор, рядом парк.",
        fullDescription: "Просторная однокомнатная квартира, тихий двор, рядом парк. Полностью оборудованная кухня, стиральная машина, кондиционер, быстрый интернет. Идеально подходит для командировочных и коротких поездок.",
        address: "ул. Примерная, 2",
        metro: "Войковская",
        pricePerNight: 4000,
        images: ["/placeholder-apartment.webp", "/placeholder-apartment.webp", "/placeholder-apartment.webp"],
        amenities: ["Wi-Fi", "Кондиционер", "Стиральная машина", "Кухня", "Парковка"],
        bookedDates: ["2026-07-15", "2026-07-16", "2026-07-17", "2026-07-24"],
    },
    {
        id: "3",
        slug: "apartment-3",
        title: "Апартаменты у МЦД Стрешнево",
        description: "Современный интерьер, вид на парк, всё необходимое для командировки.",
        fullDescription: "Современный интерьер, вид на парк, всё необходимое для командировки. Полностью оборудованная кухня, стиральная машина, кондиционер, быстрый интернет. Идеально подходит для командировочных и коротких поездок.",
        address: "ул. Примерная, 3",
        metro: "МЦД Стрешнево",
        pricePerNight: 3800,
        images: ["/placeholder-apartment.webp", "/placeholder-apartment.webp"],
        amenities: ["Wi-Fi", "Кондиционер", "Стиральная машина", "Кухня", "Парковка"],
        bookedDates: ["2026-07-15", "2026-07-16", "2026-07-17", "2026-07-24"],
    },
    {
        id: "4",
        slug: "apartment-4",
        title: "Двухкомнатная квартира у Сокола",
        description: "Подойдёт для командировочных вдвоём или небольшой семьи.",
        fullDescription: "Подойдёт для командировочных вдвоём или небольшой семьи. Полностью оборудованная кухня, стиральная машина, кондиционер, быстрый интернет. Идеально подходит для командировочных и коротких поездок.",
        address: "ул. Примерная, 4",
        metro: "Сокол",
        pricePerNight: 5000,
        images: ["/placeholder-apartment.webp", "/placeholder-apartment.webp", "/placeholder-apartment.webp"],
        amenities: ["Wi-Fi", "Кондиционер", "Стиральная машина", "Кухня", "Парковка"],
        bookedDates: ["2026-07-15", "2026-07-16", "2026-07-17", "2026-07-24"],
    },
];
// Сколько дней вперёд заполнить в календаре
var DAYS_AHEAD = 180;
function formatDate(d) {
    return d.toISOString().split("T")[0]; // "YYYY-MM-DD"
}
function seed() {
    return __awaiter(this, void 0, void 0, function () {
        var _loop_1, _i, mockApartments_1, apt;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Очищаю существующие данные...");
                    return [4 /*yield*/, client_1.db.delete(schema_1.calendarEntries)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, client_1.db.delete(schema_1.apartmentImages)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, client_1.db.delete(schema_1.apartments)];
                case 3:
                    _a.sent();
                    _loop_1 = function (apt) {
                        var inserted, apartmentId, bookedSet, today, entries, i, date, dateStr;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    console.log("\u0414\u043E\u0431\u0430\u0432\u043B\u044F\u044E \u043A\u0432\u0430\u0440\u0442\u0438\u0440\u0443: ".concat(apt.title));
                                    return [4 /*yield*/, client_1.db
                                            .insert(schema_1.apartments)
                                            .values({
                                            slug: apt.slug,
                                            title: apt.title,
                                            description: apt.description,
                                            fullDescription: apt.fullDescription,
                                            address: apt.address,
                                            metro: apt.metro,
                                            pricePerNight: apt.pricePerNight,
                                            amenities: apt.amenities,
                                        })
                                            .returning({ id: schema_1.apartments.id })];
                                case 1:
                                    inserted = (_b.sent())[0];
                                    apartmentId = inserted.id;
                                    // Фото
                                    return [4 /*yield*/, client_1.db.insert(schema_1.apartmentImages).values(apt.images.map(function (url, index) { return ({
                                            apartmentId: apartmentId,
                                            url: url,
                                            sortOrder: index,
                                        }); }))];
                                case 2:
                                    // Фото
                                    _b.sent();
                                    bookedSet = new Set(apt.bookedDates);
                                    today = new Date();
                                    entries = [];
                                    for (i = 0; i < DAYS_AHEAD; i++) {
                                        date = new Date(today);
                                        date.setDate(today.getDate() + i);
                                        dateStr = formatDate(date);
                                        entries.push({
                                            apartmentId: apartmentId,
                                            date: dateStr,
                                            isAvailable: !bookedSet.has(dateStr),
                                            price: null, // используется pricePerNight по умолчанию
                                        });
                                    }
                                    return [4 /*yield*/, client_1.db.insert(schema_1.calendarEntries).values(entries)];
                                case 3:
                                    _b.sent();
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _i = 0, mockApartments_1 = mockApartments;
                    _a.label = 4;
                case 4:
                    if (!(_i < mockApartments_1.length)) return [3 /*break*/, 7];
                    apt = mockApartments_1[_i];
                    return [5 /*yield**/, _loop_1(apt)];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6:
                    _i++;
                    return [3 /*break*/, 4];
                case 7:
                    console.log("Готово! Все квартиры и календарь добавлены.");
                    return [2 /*return*/];
            }
        });
    });
}
seed()
    .then(function () { return process.exit(0); })
    .catch(function (err) {
    console.error("Ошибка при сидировании:", err);
    process.exit(1);
});
