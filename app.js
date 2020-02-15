/** search canvas on MDN
 * HTML element. context를 갖는다. 
 * context란 해당 요소의 픽셀에 접근할 수 있는 방법. 우리는 context로 canvas 의 픽셀을 다룰 수 있다.
 * canvas는 두 개의 사이즈를 가져야 한다.
 * 1) CSS, HTML로 정해주는 사이즈.
 * 2) pixel을 다룰 수 있는 공간의 크기.
 * 
 * 기본적으로 pixel을 다루기 때문에 이미지를 만들어준다. canvas 위에 마우스 우클릭을 하면 이미지를 저장할 수 있다.
 */
const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d");
// querySelector는 해당 셀렉터를 갖고 있는 요소 중 첫 번째 요소만 가져온다.
// querySelectorAll하면 모든 요소를 Nodelist로 가져온다. 
// https://developer.mozilla.org/ko/docs/Web/API/NodeList
// getElementByClassName 은 기본적으로 array-like object.
const colors = document.querySelectorAll(".jsColor");
const range = document.querySelector("#jsRange");
const mode = document.querySelector("#jsMode");
const save = document.querySelector("#jsSave");

// 뭔가 반복하게 되면 이런 변수를 만들어서 재활용. - 예) 기본값 등.
const INITIAL_COLOR = "black";
const CANVAS_SIZE = 700;

// 2) pixel을 다룰 수 있는 공간의 크기.
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

/** canvas의 기본 배경은 하얀색으로 보이지만 이미지 저장을 하면 투명(transparent로 보인다.)
 * 따라서 밑에 fillStyle을 기본 색으로 설정하기 전에 기본 배경을 하얀색으로 초기화한다.
 */
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

/** canvas context 기본값 설정 */
ctx.strokeStyle = INITIAL_COLOR; // 사용자가 처음 사용하는 색.
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5; // 펜의 굵기


// 그려지는 상태인지 아닌지.
let painting = false;
// 채우는 상태인지 아닌지.
let filling = false;

function stopPainting() {
    painting = false;
}
  
function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    // console.log(event); // 이벤트 감지 및 필요한 요소 개발자 도구에서 얻기
    /**
     * offsetX, Y - canvas 부분에서의 마우스의 좌표값
     * clientX, Y - 창 전체에서의 마우스 위치값
     */
    const x = event.offsetX;
    const y = event.offsetY;
    // console.log(event, x, y); 값 확인
    if (!painting) { // painting === false 
        ctx.beginPath(); // 클릭한 지점부터 path 시작
        ctx.moveTo(x, y); // x, y로 지점 이동
        // 이동 이후엔 더이상 위의 구문은 작동하지 않는다. 
    } else { // painting === true
        ctx.lineTo(x, y); // beginPath()부터 이동된 x, y까지 선으로 연결
        ctx.stroke();
    }
}

function handleColorClick(event) {
    // event.target
    // https://developer.mozilla.org/ko/docs/Web/API/Event/target
    // console.log(event.target.style); 로 원하는 요소 확인
    const color = event.target.style.backgroundColor;
    // console.log(color); 색 확인
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handeRangeChange(event) {
    // HTML input tag 에서 설정한 min, max, step, value 조작 가능
    // console.log(event.target.value);
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handeModeClick() {
    if (filling === true) {
        filling = false;
        // innerText는 문자열 그대로를 추가. innerHTML 은 HTML 태그를 적용시켜서 추가.
        mode.innerText = "PAINT";
    } else {
        filling = true;
        mode.innerText = "FILL";
    }
}

function handleFillCanvas(event) {
    if (filling) { // filling 이 true 일 때만 작동. 이게 없으면 paint 모드에도 click 이벤트를 감지하여 화면을 채운다.
    // fillRect(x, y, width, height) : x, y 좌표에 width, height 값을 갖는 사각형 출력
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}
// 우클릭 시 나오는 박스 발생 방지.
function handleCtxMenu(e) {
    e.preventDefault(); // 이벤트 발생 방지.
}

// https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL
function handeSave() {
    // 데이터를 이미지로 받기.
    const image = canvas.toDataURL("image/png"); // or "image/jpeg" 기본값 png
    // console.log(image);
    // body 태그에 append 하지 않는다. 즉 유저에게는 보이지 않는 a 태그를 생성하고, 그걸 클릭한다.
    const link = document.createElement("a");
    // HTML5에 추가된 속성. <a> 태그의 download 속성. 브라우저는 <a> 태그에 download 속성이 설정되어 있으면 링크가 가리키는 파일을 다운로드한다. 즉, 마치 링크 위에서 마우스 오른쪽 버튼을 클릭하고 "다른 이름으로 링크 저장"을 실행하는 것과 같다.
    // href에는 저장할 링크를, download에는 저장될 파일의 이름을 설정
    link.href = image;
    link.download = "HelloCanvas";
    // console.log(link);

    // 가상의 a 태그 클릭
    link.click();

}

// canvas 에서 벌어지는 일들
if (canvas) {
    /* canvas 위에서 마우스가 움직이면 감지한다. */
    canvas.addEventListener("mousemove", onMouseMove);
    /** canvas 클릭하는 순간을 감지한다. */
    canvas.addEventListener("mousedown", startPainting);
    /** canvas 클릭을 해제하는 순간을 감지한다. */
    // onMouseUp 함수를 만드는 것보다 stopPainting을 재활용하는 것이 좀더 효율적이다.
    canvas.addEventListener("mouseup", stopPainting);
    /** canvas 영역을 떠나는 순간을 감지한다. */
    // onMouseLeave 함수를 만드는 것보다 stopPainting을 재활용하는 것이 좀더 효율적이다.
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleFillCanvas);
    canvas.addEventListener("contextmenu", handleCtxMenu); // canvas 마우스 우클릭 시 나오는 박스
}

// Array.from(object) : object로부터 array를 만든다. 
// console.log(Array.from(colors));
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
// Array.from(colors) 배열의 요소 하나하나를 color라고 칭한다.(다른 값이어도 상관없음.) 그 요소 하나하나에 addEventListener 함수 실행.
// html에서 가져온 값에 대해선 이런 식으로 유효성 검사를 하는 것이 좋다.
if (colors) {
    Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));
}

if (range) {
    // range는 input 이벤트에 반응한다.
    range.addEventListener("input", handeRangeChange);
}

if (mode) {
    mode.addEventListener("click", handeModeClick);
}

if (save) {
    save.addEventListener("click", handeSave);
}