import { useEffect } from 'react';
import './Slider.scss';

/* slide Image settings */
const imageCount = 17;
const images = require.context('../../../assets/img/member', true);
const slideImages = [];

for (let i = 1; i <= imageCount; i++) {
    const image = images(`./${i}.png`);
    slideImages.push(image);
}
/**********************/

const shuffle = (array) => {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

export const Slider = () => {
    const data = shuffle(slideImages);

    let width;
    let padding;
    let mousePressed = false;
    let timeInterval__1, timeInterval__2, timeInterval__3;
    let isAnimating = false;
    const firstPos = {};
    const curPos = {};

    const initialWidth = () => {
        const subElements = document.getElementsByClassName('slider__eachItem__pic');
        for (let i = 0; i < subElements.length; i++) {
            subElements[i].style.width = width + 'px';
            subElements[i].style.height = width + 'px';

            if (i === Math.ceil(subElements.length / 2 - 1)) {
                subElements[i].style.width = width * 1.5 + 'px';
                subElements[i].style.height = width * 1.5 + 'px';
            } else if (i === Math.ceil(subElements.length / 2 - 2) || i === Math.ceil(subElements.length / 2)) {
                subElements[i].style.width = width * 1.18 + 'px';
                subElements[i].style.height = width * 1.18 + 'px';
            }
        }
    }

    const justifyWidth = () => {
        const subElements = document.getElementsByClassName('slider__eachItem__pic');
        for (let i = 0; i < subElements.length; i++) {
            subElements[i].style.width = width + 'px';
            subElements[i].style.height = width + 'px';

            if (i === Math.ceil(subElements.length / 2)) {
                subElements[i].style.width = width * 1.5 + 'px';
                subElements[i].style.height = width * 1.5 + 'px';
            } else if (i === Math.ceil(subElements.length / 2 - 1) || i === Math.ceil(subElements.length / 2 + 1)) {
                subElements[i].style.width = width * 1.18 + 'px';
                subElements[i].style.height = width * 1.18 + 'px';
            }
        }
    }

    const loopAction = () => {
        const root = document.getElementsByClassName('sliderWrapper')[0];
        const value = window.innerWidth / 2 - ((width + padding * 2) * Math.ceil(imageCount / 2 - 2) + width * 1.18 + padding * 2 + (width * 1.5 + padding * 2) / 2);
        root.style.transition = 'unset';
        root.style.transform = `translateX(${value}px)`;

        timeInterval__1 = setTimeout(() => {
            justifyWidth();

            const newValue = window.innerWidth / 2 - ((width + padding * 2) * Math.ceil(imageCount / 2 - 2) + width * 1.18 + padding * 2 + (width * 1.5 + padding * 2) / 2) - (width + padding * 2);
            root.style.transform = `translateX(${newValue}px)`;
            root.style.transition = 'all 0.5s';

            timeInterval__2 = setTimeout(() => {
                const elements = document.getElementsByClassName('slider__eachItem');
                const temp = elements[0].cloneNode(true);
                elements[0].remove();
                root.appendChild(temp);

                loopAction();
            }, 1000);
        }, 3000);
    }

    const resizeHandler = () => {
        if (window.innerWidth > 1200) {
            width = 200;
            padding = 30;
        }
        if (window.innerWidth < 1200) {
            width = 200;
            padding = 20;
        }
        if (window.innerWidth < 768) {
            width = 180;
            padding = 20;
        }
        if (window.innerWidth < 568) {
            width = 150;
            padding = 10;
        }
        initialWidth();

        const root = document.getElementsByClassName('sliderWrapper')[0];
        root.style.height = width * 1.5 + 'px';

        const value = window.innerWidth / 2 - ((width + padding * 2) * Math.ceil(imageCount / 2 - 2) + width * 1.18 + padding * 2 + (width * 1.5 + padding * 2) / 2);
        root.style.transition = 'unset';
        root.style.transform = `translateX(${value}px)`;
    }

    const mouseDownEvent = (ev) => {
        mousePressed = ev.button === 0 && !isAnimating;

        if (mousePressed) {
            firstPos.x = ev.clientX;
            firstPos.y = ev.clientY;

            clearTimeout(timeInterval__1);
            clearTimeout(timeInterval__2);
            clearTimeout(timeInterval__3);
        }
    }

    const mouseMoveEvent = (ev) => {
        if (!mousePressed)
            return;

        const value = window.innerWidth / 2 - ((width + padding * 2) * Math.ceil(imageCount / 2 - 2) + width * 1.18 + padding * 2 + (width * 1.5 + padding * 2) / 2);

        const currentPos = {
            x: ev.clientX,
            y: ev.clientY
        };

        const offset = firstPos.x - currentPos.x;

        const root = document.getElementsByClassName('sliderWrapper')[0];
        root.style.transition = 'unset';
        root.style.transform = `translateX(${value - offset}px)`;
    }

    const mouseUpEvent = (ev) => {
        if (!mousePressed)
            return;

        mousePressed = false;

        const currentPos = {
            x: ev.clientX,
            y: ev.clientY
        };

        const offset = firstPos.x - currentPos.x;
        const cnt = Math.floor(Math.abs(offset / (width + padding)));

        const root = document.getElementsByClassName('sliderWrapper')[0];
        const value = window.innerWidth / 2 - ((width + padding * 2) * Math.ceil(imageCount / 2 - 2) + width * 1.18 + padding * 2 + (width * 1.5 + padding * 2) / 2);
        root.style.transition = 'all 0.5s';
        root.style.transform = `translateX(${value - (width + padding * 2) * cnt * (offset < 0 ? -1 : 1)}px)`;

        const subElements = document.getElementsByClassName('slider__eachItem__pic');
        for (let i = 0; i < subElements.length; i++) {
            subElements[i].style.width = width + 'px';
            subElements[i].style.height = width + 'px';
        }

        subElements[Math.ceil(subElements.length / 2 + cnt * (offset < 0 ? -1 : 1) - 1)].style.width = width * 1.5 + 'px';
        subElements[Math.ceil(subElements.length / 2 + cnt * (offset < 0 ? -1 : 1) - 1)].style.height = width * 1.5 + 'px';

        subElements[Math.ceil(subElements.length / 2 + cnt * (offset < 0 ? -1 : 1) - 2)].style.width = width * 1.18 + 'px';
        subElements[Math.ceil(subElements.length / 2 + cnt * (offset < 0 ? -1 : 1) - 2)].style.height = width * 1.18 + 'px';

        subElements[Math.ceil(subElements.length / 2 + cnt * (offset < 0 ? -1 : 1))].style.width = width * 1.18 + 'px';
        subElements[Math.ceil(subElements.length / 2 + cnt * (offset < 0 ? -1 : 1))].style.height = width * 1.18 + 'px';

        isAnimating = true;

        clearTimeout(timeInterval__3);
        timeInterval__3 = setTimeout(() => {
            isAnimating = false;

            for (let i = 0; i < cnt; i++) {
                const elements = document.getElementsByClassName('slider__eachItem');
                const index = offset > 0 ? 0 : elements.length - 1;

                const temp = elements[index].cloneNode(true);
                elements[index].remove();

                const root = document.getElementsByClassName('sliderWrapper')[0];

                offset > 0 ? root.appendChild(temp) : root.prepend(temp);
            }

            loopAction();
        }, 500);
    }

    const touchStartEvent = (ev) => {
        mousePressed = !isAnimating;

        if (mousePressed) {
            firstPos.x = ev.touches[0].clientX;
            firstPos.y = ev.touches[0].clientY;

            clearTimeout(timeInterval__1);
            clearTimeout(timeInterval__2);
            clearTimeout(timeInterval__3);
        }
    }

    const touchMoveEvent = (ev) => {
        if (!mousePressed)
            return;

        const value = window.innerWidth / 2 - ((width + padding * 2) * Math.ceil(imageCount / 2 - 2) + width * 1.18 + padding * 2 + (width * 1.5 + padding * 2) / 2);

        const currentPos = {
            x: ev.touches[0].clientX,
            y: ev.touches[0].clientY
        };

        curPos.x = currentPos.x;
        curPos.y = currentPos.y;

        const offset = firstPos.x - currentPos.x;

        const root = document.getElementsByClassName('sliderWrapper')[0];
        root.style.transition = 'unset';
        root.style.transform = `translateX(${value - offset}px)`;
    }

    const touchEndEvent = (ev) => {
        if (!mousePressed || !curPos.x)
            return;

        mousePressed = false;

        const currentPos = { ...curPos };

        const offset = firstPos.x - currentPos.x;
        const cnt = Math.floor(Math.abs(offset / (width + padding)));

        const root = document.getElementsByClassName('sliderWrapper')[0];
        const value = window.innerWidth / 2 - ((width + padding * 2) * Math.ceil(imageCount / 2 - 2) + width * 1.18 + padding * 2 + (width * 1.5 + padding * 2) / 2);
        root.style.transition = 'all 0.5s';
        root.style.transform = `translateX(${value - (width + padding * 2) * cnt * (offset < 0 ? -1 : 1)}px)`;

        const subElements = document.getElementsByClassName('slider__eachItem__pic');
        for (let i = 0; i < subElements.length; i++) {
            subElements[i].style.width = width + 'px';
            subElements[i].style.height = width + 'px';
        }

        subElements[Math.ceil(subElements.length / 2 + cnt * (offset < 0 ? -1 : 1) - 1)].style.width = width * 1.5 + 'px';
        subElements[Math.ceil(subElements.length / 2 + cnt * (offset < 0 ? -1 : 1) - 1)].style.height = width * 1.5 + 'px';

        subElements[Math.ceil(subElements.length / 2 + cnt * (offset < 0 ? -1 : 1) - 2)].style.width = width * 1.18 + 'px';
        subElements[Math.ceil(subElements.length / 2 + cnt * (offset < 0 ? -1 : 1) - 2)].style.height = width * 1.18 + 'px';

        subElements[Math.ceil(subElements.length / 2 + cnt * (offset < 0 ? -1 : 1))].style.width = width * 1.18 + 'px';
        subElements[Math.ceil(subElements.length / 2 + cnt * (offset < 0 ? -1 : 1))].style.height = width * 1.18 + 'px';

        isAnimating = true;

        clearTimeout(timeInterval__3);
        timeInterval__3 = setTimeout(() => {
            isAnimating = false;

            for (let i = 0; i < cnt; i++) {
                const elements = document.getElementsByClassName('slider__eachItem');
                const index = offset > 0 ? 0 : elements.length - 1;

                const temp = elements[index].cloneNode(true);
                elements[index].remove();

                const root = document.getElementsByClassName('sliderWrapper')[0];

                offset > 0 ? root.appendChild(temp) : root.prepend(temp);
            }

            loopAction();
        }, 500);
    }

    const init = () => {
        resizeHandler();
        initialWidth();
        loopAction();
    }

    useEffect(() => {
        init();

        window.addEventListener('resize', resizeHandler);
        window.addEventListener('mouseup', mouseUpEvent);
        window.addEventListener('mousemove', mouseMoveEvent);
        window.addEventListener('touchstart', touchStartEvent);
        window.addEventListener('touchmove', touchMoveEvent);
        window.addEventListener('touchend', touchEndEvent);

        return () => {
            window.removeEventListener('resize', resizeHandler);
            window.removeEventListener('mouseup', mouseUpEvent);
            window.removeEventListener('mousemove', mouseMoveEvent);

            window.removeEventListener('touchstart', touchStartEvent);
            window.removeEventListener('touchmove', touchMoveEvent);
            window.removeEventListener('touchend', touchEndEvent);
        }
    });

    return (
        <section className="slider">
            <div
                className="sliderWrapper"
                onMouseDown={mouseDownEvent}
            >
                {
                    data.map((item, index) => (
                        <div key={index} className="slider__eachItem">
                            <div className="slider__eachItem__pic" style={{ backgroundImage: `url(${item.default}` }}>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}

export default Slider;