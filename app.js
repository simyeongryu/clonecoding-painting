const canvas = document.querySelector("#jsCanvas");

// 그려지는 상태인지 아닌지.
let painting = false;

function stopPainting() {
    painting = false;
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
}

function onMouseDown(event) {
    painting = true;
    
}

function onMouseUp (event) {
    stopPainting()
    
}

if (canvas) {
    /* canvas 위에서 마우스가 움직이면 감지한다. */
    canvas.addEventListener("mousemove", onMouseMove);
    /** canvas 클릭하는 순간을 감지한다. */
    canvas.addEventListener("mousedown", onMouseDown);
    /** canvas 클릭을 해제하는 순간을 감지한다. */
    canvas.addEventListener("mouseup", onMouseUp);
    /** canvas 영역을 떠나는 순간을 감지한다. */
    // onMouseLeave 함수를 만드는 것보다 stopPainting을 재활용하는 것이 좀더 효율적이다.
    canvas.addEventListener("mouseleave", stopPainting);

}

