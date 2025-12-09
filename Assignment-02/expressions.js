// Q1: Solve the below code of expressions using short circuit?
let a = 5;
let exp1 = ((4 + 5) && "abc" || false + "test") * (a-- || --a) || (false && (++a + 1)) * "end";

// ((4 + 5) && "abc" || false + "test") * (a-- || --a) || (false && (++a + 1)) * "end"
// 4 + 5 => 9
// 9 && "abc" => "abc"
// "abc" || (false + "test") => "abc"
//  a-- => 5
// (a-- || --a) => 5
// "abc" * 5 => NaN
// (false && (++a + 1)) => false
// false * "end" => 0 * NaN => NaN
// NaN || NaN => NaN

// Result:   NaN
// a : 4


let exp2 = 10 * ("foo" && 5 + (++a) || "bar") && (false + "test") || 0 && true;


exp2 = 10 * ("foo" && 5 + (++a) || "bar") && (false + "test") || 0 && true;
// 10 * ("foo" && 5 + (++a) || "bar") && (false + "test") || 0 && true

// "foo" && 5 + (++a):
//   ++a => 5
//   5 + 5 => 10
// "foo" && 10 => 10
// 10 || "bar" => 10
// 10 * 10 => 100
// 100 && (false + "test") => (false + "test") => "falsetest"
// 0 && true => 0
// "falsetest" || 0 => "falsetest"

// Result:  "falsetest"
// a : 5


let exp3 = 3 + (a-- || "start") * 4 && (--a + "value") * (1 + 2) + "result";


// a-- => 5
// (a-- || "start") => 5
// 5 * 4 => 20
// 3 + 20 => 23

// --a => 3
// --a + "value" => 3 + "value" => "3value"
// 1 + 2 => 3
// ("3value") * 3 => NaN
// NaN + "result" => "NaNresult"

// 23 && "NaNresult" => "NaNresult"

// Result:  "NaNresult"
// a: 3


let exp4 = "hello" * (++a + true) || (2 + 3 * "abc") * (0 + 1) + "xyz" && 0;


// ++a => 4
// true => 1
// 4 + 1 => 5
// "hello" * 5 => NaN
// 3 * "abc" => NaN
// 2 + NaN => NaN
// NaN * 1 => NaN
// NaN + "xyz" => "NaNxyz"
// "NaNxyz" && 0 => 0
// NaN || 0 => 0
// Result: 0
// a : 4


let exp5 = (true || (0 + 1) * "test" && 4) || (false && 3 + "value") * a-- + 2;

// 1 * test => NaN
// NaN && 4 => NaN
// true || NaN => true
// Result: true
// a: 4

let exp6 = ++a + "abc" && (4 * 2) + 3 || (0 + 1) && (3 * "hello") || a--;

// ++a => 5
// 5 + "abc" => "5abc"

// "5abc" && (8 + 3) => 11
// Result: 11
// a: 5


let exp7 = ("foo" + 5) * (++a + true) || 2 * 3 + (true + 2) || "result";
// "foo" + 5 => "foo5"
// ++a => 6
// true => 1
// 6 + 1 => 7
// "foo5" * 7 => Nan
// 2 * 3 => 6
// true + 2 => 3
// 6 + 3 => 9
// Result: 9
// a: 6

let exp8 = (0 + 1) && (true + 0) || (false + "test") * 4 && 3 + 2 || "value";

// console.log(true + 0)
// 0 + 1 => 1
// true + 0 => 1
// 1 && 1 => 1
// Result: 1
// a: 6

let exp9 = 3 * "abc" + (true + 1) || (++a + "test") && (3 + "result") || null;

// 3 * "abc" => Nan
// true + 1 => 2
// NaN + 2 => Nan
// ++a => 7
// 7 + "test" => "7test"
// 3 + "result" => "3result"
// "7test" && "3result" => "3result"
// Result: "3result"
// a: 7

let exp10 = (++a + false) && "start" || 0 + 1 && "value" || 5 * "end" && a++;

// ++a => 8
// 8 + false => 8
// 8 && "start" => "start"

// Result: "start"
// a: 8


    let exp11 = (false && "hello") + (a++ || 3 + "test") * 4 || 5 * "abc" && 0;

// false && "hello" => false
// a++ => 8
// 8 * 4 => 32
// 0 + 32 => 32
// Result: 32
// a: 9

let exp12 = "hello" * (true + 0) + 2 || (false + 1) * 3 && "result" || 4 + "test";
// true + 0 => 1
// "hello" * 1 => NaN
// NaN + 2 => NaNN
// false + 1 => 1
// 1 * 3 => 3
// 3 && "result" => "result"
// Result: "result"
// a: 9


let exp13 = 5 * (a++ || false) + 2 && (false + "test") || 3 * "end" && 4;
// a++ => 9
// 5 * 9 => 45
// 45 + 2 => 47
// false + "test" => "falsetest"
// 47 && "falsetest" => "falsetest"
// Result: "falsetest"
// a: 10

let exp14 = (false + "abc") * 2 || (--a + 1) * "start" + 3 && 4 || "end";
// false + "abc" => "falseabc"
// "falseabc" * 2 => NaN
// --a => 9
// 9 + 1 => 10
// "start" * 10 => NaN
// NaN + 3 => NaN
// NaN && 4 => NaN
// NaN || "end" => "end"
// Result: "end"
// a: 9


let exp15 = (0 + "foo") * 3 + (true && "result") || "start" + (++a + 1) * 4;
// 0 + "foo" => "foo"
// "foo" * 3 => NaN
// true && "result" => "result"
// NaN + "result" => "NaNresult"
// Result: "NaNresult"
// a: 9

let exp16 = 2 * "end" || (false && true) || "start" + (--a + 2) * 5 && null;
// 2 * "end" => NaN
// false && true => false
// --a => 8
// 8 + 2 => 10
// 10 * 5 => 50
// "start" + 50 => "start50"
// "start50" && null => null
// Result: null
// a: 8


let exp17 = 3 + 2 * ("test" + a--) && (false + 3) * 5 || 0 + "value" && 4;
// a-- => 8
// "test" + 8 => "test8"
// 2 * "test8" => NaN
// 3 + NaN => NaN
// false + 3 => 3
// 3 * 5 => 15
// NaN && 15 => NaN
// 0 + "value" => "value"
// "value" && 4 => 4
// Result: 4
// a: 7

let exp18 = "start" && (false || 2 * "end") || (++a + 1) * 3 + "result" && 0;
// 2 * "end" => NaN
// false || NaN => NaN
// "start" && NaN => NaN
// ++a => 8
// 8 + 1 => 9
// 9 * 3 => 27
// 27 + "result" => "27result"
// "27result" && 0 => 0
// Result: 0
// a: 8


let exp19 = ((5 + 1) && "foo") || (++a + 2) * (false + 3) + "test" && 7;
// 5 + 1 => 6
// 6 && "foo" => "foo"
// Result: "foo"
// a: 8

let exp20 = 2 * 3 + "hello" && (false + ++a) * "result" || "end" + 5 || 0;
// 2 * 3 => 6
// 6 + "hello" => "6hello"
// ++a => 9
// false + 9 => 9
// 9 * "result" => NaN
// "6hello" && NaN => NaN
// "end" + 5 => "end5"
// Result: "end5"
// a: 9


let exp21 = 5 * (true + ++a) && ("test" + false) || 7 * (true + 2) + "value";
// ++a => 10
// true + 10 => 11
// 5 * 11 => 55
// "test" + false => "testfalse"
// 55 && "testfalse" => "testfalse"
// Result: "testfalse"
// a: 10

let exp22 = "foo" + 4 && (++a + 1) * "start" || 5 + 6 * (false + true) && "test";
// "foo" + 4 => "foo4"
// ++a => 11
// 11 + 1 => 12
// 12 * "start" => NaN
// "foo4" && NaN => NaN
// false + true => 1
// 6 * 1 => 6
// 5 + 6 => 11
// 11 && "test" => "test"
// Result: "test"
// a: 11

let exp23 = (false && 2) || (a++ + 1) * "end" && "start" || 4 * 5 && "result";
// false && 2 => false
// a++ => 11
// 11 + 1 => 12
// 12 * "end" => NaN
// NaN && "start" => NaN
// 4 * 5 => 20
// 20 && "result" => "result"
// Result: "result"
// a: 12

let exp24 = 3 + 2 * "test" || (false + a--) * "hello" && "world" + 1 || 2;
// 2 * "test" => NaN
// 3 + NaN => NaN
// false + a-- => 12
// 12 * "hello" => NaN
// NaN && "world1" => NaN
// Result: 2
// a: 11

let exp25 = (3 + 4) * (false || a--) && 5 || "start" + 1 + "test" && 0;
// 3 + 4 => 7
// a-- => 11
// 7 * 11 => 77
// 77 && 5 => 5
// Result: 5
// a: 10

let exp26 = "hello" && 3 * 2 + (a++ + 1) || (false + true) * "result" + "end";
// a++ => 10
// 10 + 1 => 11
// 3 * 2 => 6
// 6 + 11 => 17
// "hello" && 17 => 17
// Result: 17
// a: 11


let exp27 = 3 * "test" + (true + 2) && (false || "value") || "start" + a++;
// 3 * "test" => NaN
// true + 2 => 3
// NaN + 3 => NaN
// false || "value" => "value"
// NaN && "value" => NaN
// "start" + a++ => "start11"
// Result: "start11"
// a: 12


let exp28 = (false + 1) * "hello" || 3 + (a-- && 5) * "result" || "world";
// false + 1 => 1
// 1 * "hello" => NaN
// a-- => 12
// 12 && 5 => 5
// 5 * "result" => NaN
// 3 + NaN => NaN
// Result: "world"
// a: 11


let exp29 = "start" + 2 * (true || 1) && (false || "value") * 5 + "result";
// true || 1 => true
// 2 * true => 2
// "start" + 2 => "start2"
// false || "value" => "value"
// "value" * 5 => NaN
// NaN + "result" => "NaNresult"
// Result: "NaNresult"
// a: 11


let exp30 = (true + 3) * "test" || 1 * 5 && (false + "value") + "end" || a--;
// true + 3 => 4
// 4 * "test" => NaN
// 1 * 5 => 5
// false + "value" => "falsevalue"
// "falsevalue" + "end" => "falsevalueend"
// 5 && "falsevalueend" => "falsevalueend"
// Result: "falsevalueend"
// a: 11


let exp31 = 3 + "end" || 2 * "test" && (++a + true) || "start" + 1;
// 3 + "end" => "3end"
// Result: "3end"
// a: 11


let exp32 = (0 + 3) * (true + false) || 5 * "hello" + 2 && (false + "test");
// 0 + 3 => 3
// true + false => 1
// 3 * 1 => 3
// Result: 3
// a: 11


let exp33 = 2 + 3 && ("end" + a++) || (false + "test") * 4 && 5;
// 2 + 3 => 5
// a++ => 11
// "end" + 11 => "end11"
// 5 && "end11" => "end11"
// Result: "end11"
// a: 12


let exp34 = "hello" + 4 * (false + a--) || 3 && "start" + 1 || (true + "test");
// false + a-- => 12
// 4 * 12 => 48
// "hello" + 48 => "hello48"
// Result: "hello48"
// a: 11


let exp35 = "start" && (a-- || "test") * 4 + 5 && (false + "end") || 2;
// a-- => 11
// 11 * 4 => 44
// 44 + 5 => 49
// false + "end" => "falseend"
// 49 && "falseend" => "falseend"
// "start" && "falseend" => "falseend"
// Result: "falseend"
// a: 10


let exp36 = 1 + "value" && (++a + 2) || (3 + "result") * true && 4;
// 1 + "value" => "1value"
// ++a => 11
// 11 + 2 => 13
// "1value" && 13 => 13
// Result: 13
// a: 11


let exp37 = "hello" && 2 + "test" || (++a + 3) && (true + "value") + 1;
// 2 + "test" => "2test"
// "hello" && "2test" => "2test"
// Result: "2test"
// a: 11


let exp38 = 5 * (a-- || "test") && 6 * "result" || 2 + "end";
// a-- => 11
// 5 * 11 => 55
// 6 * "result" => NaN
// 55 && NaN => NaN
// 2 + "end" => "2end"
// Result: "2end"
// a: 10


let exp39 = "start" && (false + 1) * 2 || 3 + 4 * "hello" + 5 && 0;
// false + 1 => 1
// 1 * 2 => 2
// "start" && 2 => 2
// Result: 2
// a: 10


let exp40 = (false || "test") * 5 || 6 + (a-- && "result") * 4;
// false || "test" => "test"
// "test" * 5 => NaN
// a-- => 10
// 10 && "result" => "result"
// "result" * 4 => NaN
// 6 + NaN => NaN
// Result: NaN
// a: 9


let exp41 = "start" && (3 + 2) * "test" + 5 || 4 * (false + 1) && "hello";
// 3 + 2 => 5
// 5 * "test" => NaN
// NaN + 5 => NaN
// "start" && NaN => NaN
// false + 1 => 1
// 4 * 1 => 4
// 4 && "hello" => "hello"
// Result: "hello"
// a: 9


let exp42 = 1 + 2 * "end" || (false + 3) && "result" * 4 + a--;
// 2 * "end" => NaN
// 1 + NaN => NaN
// false + 3 => 3
// "result" * 4 => NaN
// NaN + a-- => NaN
// 3 && NaN => NaN
// Result: NaN
// a: 8


let exp43 = (false && a--) || 4 * (3 + 2) && "start" + 5;
// false && a-- => false
// 3 + 2 => 5
// 4 * 5 => 20
// "start" + 5 => "start5"
// 20 && "start5" => "start5"
// Result: "start5"
// a: 8


let exp44 = 3 + 2 * (true + 5) && "value" + 1 || (++a + 2) + "test";
// true + 5 => 6
// 2 * 6 => 12
// 3 + 12 => 15
// "value" + 1 => "value1"
// 15 && "value1" => "value1"
// Result: "value1"
// a: 8


let exp45 = (false || 1) + "test" && 5 + (3 * a--) || "end" + 2;
// false || 1 => 1
// 1 + "test" => "1test"
// a-- => 8
// 3 * 8 => 24
// 5 + 24 => 29
// "1test" && 29 => 29
// Result: 29
// a: 7


let exp46 = (2 * a-- + 4) && "test" || 3 + "hello" && (false + 1) * 5;
// a-- => 7
// 2 * 7 => 14
// 14 + 4 => 18
// 18 && "test" => "test"
// Result: "test"
// a: 6


let exp47 = 0 + "result" && (3 + 1) * 2 || (false + a--) * "end";
// 0 + "result" => "result"
// 3 + 1 => 4
// 4 * 2 => 8
// "result" && 8 => 8
// Result: 8
// a: 6


let exp48 = (false || 1) * "test" && 4 || (true + 2) * "hello" + a--;
// false || 1 => 1
// 1 * "test" => NaN
// true + 2 => 3
// 3 * "hello" => NaN
// NaN + a-- => NaN
// Result: NaN
// a: 5


let exp49 = (2 * 3) + "result" && 4 * (a-- + 1) || "start" + 2 + "end";
// 2 * 3 => 6
// 6 + "result" => "6result"
// a-- => 5
// 5 + 1 => 6
// 4 * 6 => 24
// "6result" && 24 => 24
// Result: 24
// a: 4


let exp50 = 32 && true - ++a && " " || "true"; // for a = 5
// ++a => 6
// true - 6 => -5
// 32 && -5 => -5
// -5 && " " => " "
// Result: " "
// a: 6


let exp51 = (5 + 2) * (a-- + 1) || "start" + (++a + "end") * 3;
// 5 + 2 => 7
// a-- => 6
// 6 + 1 => 7
// 7 * 7 => 49
// Result: 49
// a: 5


let exp52 = (++a && 3) * "test" || 4 + "start" * (a-- + "result");
// ++a => 6
// 6 && 3 => 3
// 3 * "test" => NaN
// a-- => 6
// "start" * "6result" => NaN
// 4 + NaN => NaN
// Result: NaN
// a: 5


let exp53 = 3 + "value" * (++a + 1) || (a-- && "start") + "end";
// ++a => 6
// 6 + 1 => 7
// "value" * 7 => NaN
// 3 + NaN => NaN
// a-- => 6
// 6 && "start" => "start"
// "start" + "end" => "startend"
// Result: "startend"
// a: 5


let exp54 = (a-- + 2) * "result" || (false && 5) * "test" + 4;
// a-- => 5
// 5 + 2 => 7
// 7 * "result" => NaN
// false && 5 => false
// false * "test" => NaN
// NaN + 4 => NaN
// Result: NaN
// a: 4


let exp55 = "start" + 5 * (a-- + "test") || (false + 2) * "value";
// a-- => 4
// 4 + "test" => "4test"
// 5 * "4test" => NaN
// "start" + NaN => "startNaN"
// Result: "startNaN"
// a: 3


let exp56 = 4 * (a-- + 1) + "test" || (++a + 3) * "start" + 5;
// a-- => 3
// 3 + 1 => 4
// 4 * 4 => 16
// 16 + "test" => "16test"
// Result: "16test"
// a: 2


let exp57 = (3 * "test" + 1) || (++a && a--) * "result" || "value";
// 3 * "test" => NaN
// NaN + 1 => NaN
// ++a => 3
// 3 && a-- => 3
// 3 * "result" => NaN
// Result: "value"
// a: 2


let exp58 = (a-- + "start") * "result" || (false + 2) + "end" + 3;
// a-- => 2
// 2 + "start" => "2start"
// "2start" * "result" => NaN
// false + 2 => 2
// 2 + "end" => "2end"
// "2end" + 3 => "2end3"
// Result: "2end3"
// a: 1


let exp59 = 5 * (a-- + 3) * "test" || (false && "start") + 2;
// a-- => 1
// 1 + 3 => 4
// 5 * 4 => 20
// 20 * "test" => NaN
// false && "start" => false
// false + 2 => 2
// Result: 2
// a: 0


let exp60 = (a-- + "value") * "test" + 4 || (false + 2) * "end";
// 0 + "value" => "0value"
// "0value" * "test" => NaN
// NaN + 4 => NaN
// false + 2 => 2
// 2 * "end" => NaN
// Result: NaN
// a: -1


let exp61 = 3 + (++a + "result") || (a-- + 2) * "test" + 5;
// ++a => 0
// 0 + "result" => "0result"
// 3 + "0result" => "30result"
// Result: "30result"
// a: 0


let exp62 = "start" + (a-- + "test") * 3 || (false && 4) * "end" + 5;
// 0 + "test" => "0test"
// "0test" * 3 => NaN
// "start" + NaN => "startNaN"
// Result: "startNaN"
// a: -1


let exp63 = (++a + 2) * "test" || "value" + (a-- + 3) * "result";
// ++a => 0
// 0 + 2 => 2
// 2 * "test" => NaN
// 0 + 3 => 3
// 3 * "result" => NaN
// "value" + NaN => "valueNaN"
// Result: "valueNaN"
// a: -1


let exp64 = 5 * "end" + (a-- + 1) * "test" || "start" + (false && "result");
// 5 * "end" => NaN
// -1 + 1 => 0
// 0 * "test" => NaN
// NaN + NaN => NaN
// Result: "start"
// a: -2


let exp65 = "value" + 3 * (a-- + "test") || (false + 1) * "end";
// -2 + "test" => "-2test"
// 3 * "-2test" => NaN
// "value" + NaN => "valueNaN"
// Result: "valueNaN"
// a: -3


let exp66 = (++a + "test") * 2 || (a-- + 1) * "start" + "result";
// ++a => -2
// -2 + "test" => "-2test"
// "-2test" * 2 => NaN
// -2 + 1 => -1
// -1 * "start" => NaN
// NaN + "result" => "NaNresult"
// Result: "NaNresult"
// a: -3


let exp67 = "start" + (a-- + 3) * "end" || (++a + "test") * 5;
// -3 + 3 => 0
// 0 * "end" => NaN
// "start" + NaN => "startNaN"
// Result: "startNaN"
// a: -4


let exp68 = 2 * (a-- + 1) + "result" || (false && "start") * 3;
// -4 + 1 => -3
// 2 * -3 => -6
// -6 + "result" => "-6result"
// Result: "-6result"
// a: -5


let exp69 = 4 + (a-- + "test") * 5 || (false + 2) * "start";
// -5 + "test" => "-5test"
// "-5test" * 5 => NaN
// 4 + NaN => NaN
// false + 2 => 2
// 2 * "start" => NaN
// Result: NaN
// a: -6


let exp70 = (a-- + 2) * "result" || (false && "end") + 3;
// -6 + 2 => -4
// -4 * "result" => NaN
// false && "end" => false
// false + 3 => 3
// Result: 3
// a: -7


let exp71 = "test" + 2 * (a-- + 3) || (false && "start") + 4;
// -7 + 3 => -4
// 2 * -4 => -8
// "test" + -8 => "test-8"
// Result: "test-8"
// a: -8


let exp72 = 3 * (a-- + "value") || (false + 2) * "test";
// -8 + "value" => "-8value"
// 3 * "-8value" => NaN
// false + 2 => 2
// 2 * "test" => NaN
// Result: NaN
// a: -9


let exp73 = (a-- + "test") * 4 || (false + 1) * "result" + "start";
// -9 + "test" => "-9test"
// "-9test" * 4 => NaN
// false + 1 => 1
// 1 * "result" => NaN
// NaN + "start" => "NaNstart"
// Result: "NaNstart"
// a: -10


let exp74 = (++a + 5) * "end" || (a-- + 2) * "result" + "start";
// ++a => -9
// -9 + 5 => -4
// -4 * "end" => NaN
// -9 + 2 => -7
// -7 * "result" => NaN
// NaN + "start" => "NaNstart"
// Result: "NaNstart"
// a: -10


let exp75 = (3 * "test") + (a-- + "start") || (false + 1) * "result";
// 3 * "test" => NaN
// -10 + "start" => "-10start"
// NaN + "-10start" => "NaN-10start"
// Result: "NaN-10start"
// a: -11

