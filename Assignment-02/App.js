// Q1: Solve the below code of expressions using short circuit?
let a = 5
let exp1 = ((4 + 5) && "abc" || false + "test") * (a-- || --a) || (false && (++a + 1)) * "end";
// (4 + 5) && "abc"; //abc
// "abc"|| false + "test"; //abc
// "abc"|| false + "test"; //abc
// (a-- || --a); //4
// abc * 4; // NaN
// false && (++a + 1) * "end" ; // NaN
// NaN || NaN; // NaN

// ((4 + 5) && "abc" || false + "test") * (a-- || --a) || (false && (++a + 1)) * "end"
// 4 + 5 => 9
// 9 && "abc" => "abc"
// "abc" || (false + "test") => "abc"      
//  a-- => 5   (a becomes 4)
// (a-- || --a) => 5
// "abc" * 5 => Number("abc") * 5 => NaN
// (false && (++a + 1)) => false     
// false * "end" => 0 * NaN => NaN
// NaN || NaN => NaN

// Result: exp1 = NaN
// Final a after exp1: 4


let exp2 = 10 * ("foo" && 5 + (++a) || "bar") && (false + "test") || 0 && true;

// 10 * ("foo" && 5 + (++a) || "bar") && (false + "test") || 0 && true

// "foo" && 5 + (++a):
//   ++a => 5   (a becomes 5)
//   5 + 5 => 10
// "foo" && 10 => 10
// 10 || "bar" => 10
// 10 * 10 => 100
// 100 && (false + "test") => (false + "test") => "falsetest"
// 0 && true => 0
// "falsetest" || 0 => "falsetest"

// Result: exp2 = "falsetest"
// Final a after exp2: 5


let exp3 = 3 + (a-- || "start") * 4 && (--a + "value") * (1 + 2) + "result";


// 3 + (a-- || "start") * 4 && (--a + "value") * (1 + 2) + "result"
// a-- => 5   (a becomes 4)
// (a-- || "start") => 5
// 5 * 4 => 20
// 3 + 20 => 23                     

// --a => 3   (a becomes 3)
// --a + "value" => 3 + "value" => "3value"
// 1 + 2 => 3
// ("3value") * 3 => Number("3value") * 3 => NaN
// NaN + "result" => "NaNresult"   // right side

// 23 && "NaNresult" => "NaNresult"

// Result: exp3 = "NaNresult"
// Final a after exp3: 3



let exp4 = "hello" * (++a + true) || (2 + 3 * "abc") * (0 + 1) + "xyz" && 0;
let exp5 = (true || (0 + 1) * "test" && 4) || (false && 3 + "value") * a-- + 2;
let exp6 = ++a + "abc" && (4 * 2) + 3 || (0 + 1) && (3 * "hello") || a--;
let exp7 = ("foo" + 5) * (++a + true) || 2 * 3 + (true + 2) || "result";
let exp8 = (0 + 1) && (true + 0) || (false + "test") * 4 && 3 + 2 || "value";
let exp9 = 3 * "abc" + (true + 1) || (++a + "test") && (3 + "result") || null;
let exp10 = (++a + false) && "start" || 0 + 1 && "value" || 5 * "end" && a++;
let exp11 = (false && "hello") + (a++ || 3 + "test") * 4 || 5 * "abc" && 0;
let exp12 = "hello" * (true + 0) + 2 || (false + 1) * 3 && "result" || 4 + "test";
let exp13 = 5 * (a++ || false) + 2 && (false + "test") || 3 * "end" && 4;
let exp14 = (false + "abc") * 2 || (--a + 1) * "start" + 3 && 4 || "end";
let exp15 = (0 + "foo") * 3 + (true && "result") || "start" + (++a + 1) * 4;
let exp16 = 2 * "end" || (false && true) || "start" + (--a + 2) * 5 && null;
let exp17 = 3 + 2 * ("test" + a--) && (false + 3) * 5 || 0 + "value" && 4;
let exp18 = "start" && (false || 2 * "end") || (++a + 1) * 3 + "result" && 0;
let exp19 = ((5 + 1) && "foo") || (++a + 2) * (false + 3) + "test" && 7;
let exp20 = 2 * 3 + "hello" && (false + ++a) * "result" || "end" + 5 || 0;

let exp21 = 5 * (true + ++a) && ("test" + false) || 7 * (true + 2) + "value";
let exp22 = "foo" + 4 && (++a + 1) * "start" || 5 + 6 * (false + true) && "test";
let exp23 = (false && 2) || (a++ + 1) * "end" && "start" || 4 * 5 && "result";
let exp24 = 3 + 2 * "test" || (false + a--) * "hello" && "world" + 1 || 2;
let exp25 = (3 + 4) * (false || a--) && 5 || "start" + 1 + "test" && 0;
let exp26 = "hello" && 3 * 2 + (a++ + 1) || (false + true) * "result" + "end";
let exp27 = 3 * "test" + (true + 2) && (false || "value") || "start" + a++;
let exp28 = (false + 1) * "hello" || 3 + (a-- && 5) * "result" || "world";
let exp29 = "start" + 2 * (true || 1) && (false || "value") * 5 + "result";
let exp30 = (true + 3) * "test" || 1 * 5 && (false + "value") + "end" || a--;
let exp31 = 3 + "end" || 2 * "test" && (++a + true) || "start" + 1;
let exp32 = (0 + 3) * (true + false) || 5 * "hello" + 2 && (false + "test");
let exp33 = 2 + 3 && ("end" + a++) || (false + "test") * 4 && 5;
let exp34 = "hello" + 4 * (false + a--) || 3 && "start" + 1 || (true + "test");
let exp35 = "start" && (a-- || "test") * 4 + 5 && (false + "end") || 2;
let exp36 = 1 + "value" && (++a + 2) || (3 + "result") * true && 4;
let exp37 = "hello" && 2 + "test" || (++a + 3) && (true + "value") + 1;
let exp38 = 5 * (a-- || "test") && 6 * "result" || 2 + "end";
let exp39 = "start" && (false + 1) * 2 || 3 + 4 * "hello" + 5 && 0;
let exp40 = (false || "test") * 5 || 6 + (a-- && "result") * 4;
let exp41 = "start" && (3 + 2) * "test" + 5 || 4 * (false + 1) && "hello";
let exp42 = 1 + 2 * "end" || (false + 3) && "result" * 4 + a--;

let exp43 = (false && a--) || 4 * (3 + 2) && "start" + 5;
let exp44 = 3 + 2 * (true + 5) && "value" + 1 || (++a + 2) + "test";
let exp45 = (false || 1) + "test" && 5 + (3 * a--) || "end" + 2;
let exp46 = (2 * a-- + 4) && "test" || 3 + "hello" && (false + 1) * 5;
let exp47 = 0 + "result" && (3 + 1) * 2 || (false + a--) * "end";
let exp48 = (false || 1) * "test" && 4 || (true + 2) * "hello" + a--;
let exp49 = (2 * 3) + "result" && 4 * (a-- + 1) || "start" + 2 + "end";
let exp50 = 32 && true - ++a && " " || "true"; // for a = 5
let exp51 = (5 + 2) * (a-- + 1) || "start" + (++a + "end") * 3;
let exp52 = (++a && 3) * "test" || 4 + "start" * (a-- + "result");
let exp53 = 3 + "value" * (++a + 1) || (a-- && "start") + "end";
let exp54 = (a-- + 2) * "result" || (false && 5) * "test" + 4;
let exp55 = "start" + 5 * (a-- + "test") || (false + 2) * "value";
let exp56 = 4 * (a-- + 1) + "test" || (++a + 3) * "start" + 5;
let exp57 = (3 * "test" + 1) || (++a && a--) * "result" || "value";
let exp58 = (a-- + "start") * "result" || (false + 2) + "end" + 3;
let exp59 = 5 * (a-- + 3) * "test" || (false && "start") + 2;
let exp60 = (a-- + "value") * "test" + 4 || (false + 2) * "end";
let exp61 = 3 + (++a + "result") || (a-- + 2) * "test" + 5;
let exp62 = "start" + (a-- + "test") * 3 || (false && 4) * "end" + 5;
let exp63 = (++a + 2) * "test" || "value" + (a-- + 3) * "result";
let exp64 = 5 * "end" + (a-- + 1) * "test" || "start" + (false && "result");

let exp65 = "value" + 3 * (a-- + "test") || (false + 1) * "end";
let exp66 = (++a + "test") * 2 || (a-- + 1) * "start" + "result";
let exp67 = "start" + (a-- + 3) * "end" || (++a + "test") * 5;
let exp68 = 2 * (a-- + 1) + "result" || (false && "start") * 3;
let exp69 = 4 + (a-- + "test") * 5 || (false + 2) * "start";
let exp70 = (a-- + 2) * "result" || (false && "end") + 3;
let exp71 = "test" + 2 * (a-- + 3) || (false && "start") + 4;
let exp72 = 3 * (a-- + "value") || (false + 2) * "test";
let exp73 = (a-- + "test") * 4 || (false + 1) * "result" + "start";
let exp74 = (++a + 5) * "end" || (a-- + 2) * "result" + "start";
let exp75 = (3 * "test") + (a-- + "start") || (false + 1) * "result";