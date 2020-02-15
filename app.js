/** search canvas on MDN
 * HTML element. context를 갖는다. 
 * context란 해당 요소의 픽셀에 접근할 수 있는 방법. 우리는 context로 canvas 의 픽셀을 다룰 수 있다.
 * canvas는 두 개의 사이즈를 가져야 한다.
 * 1) CSS, HTML로 정해주는 사이즈.
 * 2) pixel을 다룰 수 있는 공간의 크기.
 */
const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d");

// 2) pixel을 다룰 수 있는 공간의 크기.
canvas.width = 700;
canvas.height = 700;

/** canvas context 기본값 설정 */
ctx.strokeStyle = "black"; // 사용자가 처음 사용하는 색.
ctx.lineWidth = 2.5; // 펜의 굵기

// 그려지는 상태인지 아닌지.
let painting = false;

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
    if (!painting) { 
        console.log("working !painting");
        ctx.beginPath(); // 클릭한 지점부터 path 시작
        ctx.moveTo(x, y); // x, y로 지점 이동
        // 이동 이후엔 더이상 위의 구문은 작동하지 않는다. 
    } else {
        console.log("working stroke");
        ctx.lineTo(x, y); // beginPath()부터 이동된 x, y까지 선으로 연결
        ctx.stroke();
    }
}

function onMouseDown(event) {
    painting = true;
}

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
}



