import * as fields from './modules/fields.js';
let remainingMSeconds = fields.staticTime * 60 * 60 * 1000;
let startInterval;
let boxValues;

const addZero = num => (num < 10 ? `0${num}` : `${num}`);

const hideBtn = (btn1, btn2) => {
	btn1.style.display = 'none';
	btn2.style.display = 'inline';
};

const updateBoxes = () => fields.boxes.forEach((box, i) => (box.textContent = boxValues[i]));

const stopTimer = () => {
	remainingMSeconds = 0;
	boxValues = '000000';
	hideBtn(fields.pause, fields.play);
	clearInterval(startInterval);
	updateBoxes();
	fields.setTimeBlog.style.display = 'flex';
};

const updateTimeDifference = () => {
	if (remainingMSeconds === 0) {
		return;
	} else {
		remainingMSeconds -= 1000;
		const hours = addZero(Math.floor(remainingMSeconds / 1000 / 60 / 60));
		const minutes = addZero(Math.floor((remainingMSeconds / 1000 / 60) % 60));
		const seconds = addZero(Math.floor((remainingMSeconds / 1000) % 60));
		boxValues = [...hours, ...minutes, ...seconds];
		updateBoxes();
	}
};

const createWarningElement = () => {
	const warnElement = document.createElement('div');
	warnElement.classList.add('warn');
	warnElement.textContent = 'You can set hours from 1 to 99';
	fields.content.append(warnElement);
	setTimeout(() => warnElement.remove(), 3000);
};

const onSetHoursValue = () => {
	if (fields.hoursInput.value > 99 || fields.hoursInput.value < 1) {
		fields.hoursInput.value = fields.hoursInput.value > 99 ? 99 : 1;
		createWarningElement();
	}
	remainingMSeconds = fields.hoursInput.value * 60 * 60 * 1000;
	fields.setTimeBlog.style.display = 'none';
	updateTimeDifference();
	fields.hoursInput.value = '';
};

updateTimeDifference();

const playTimer = () => {
	if (!remainingMSeconds) {
		return;
	}
	startInterval = setInterval(updateTimeDifference, 1000);
	hideBtn(fields.play, fields.pause);
};

fields.pause.addEventListener('click', () => {
	clearInterval(startInterval);
	hideBtn(fields.pause, fields.play);
});
fields.play.addEventListener('click', playTimer);
fields.stop.addEventListener('click', stopTimer);
fields.setBtn.addEventListener('click', onSetHoursValue);
