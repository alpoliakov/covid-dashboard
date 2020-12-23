import Keyboard from 'simple-keyboard';
import 'simple-keyboard/build/css/index.css';
import './keyboard.sass';
import searcher from '../searcher';

const keyboardElem = () => {
  const { searchCountry } = searcher();
  const setKeyboard = () => {
    function onChange(input) {
      const inputElem = document.querySelector('.searcher');
      inputElem.value = input;
      console.log('Input changed', input);
      searchCountry();
    }

    function onKeyPress(button) {
      console.log('Button pressed', button);
      // eslint-disable-next-line no-use-before-define
      if (button === '{shift}' || button === '{lock}') handleShift();
    }

    const keyboard = new Keyboard({
      onChange: input => onChange(input),
      onKeyPress: button => onKeyPress(button),
    });

    function handleShift() {
      const currentLayout = keyboard.options.layoutName;
      const shiftToggle = currentLayout === 'default' ? 'shift' : 'default';

      keyboard.setOptions({
        layoutName: shiftToggle,
      });
    }

    document.querySelector('.searcher').addEventListener('input', event => {
      keyboard.setInput(event.target.value);
    });
  };

  return { setKeyboard };
};

export default keyboardElem;
