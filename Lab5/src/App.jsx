import React from 'react';
import Exercise01 from './exercises/01-start';
import Exercise02 from './exercises/02-render-objects';
import Exercise03 from './exercises/03-building-layout';
import Exercise04 from './exercises/04-building-arrays';
import Exercise05 from './exercises/05-map-array-li';
import Exercise06 from './exercises/06-map-objects-li';
import Exercise07 from './exercises/07-render-functions';
import Exercise08 from './exercises/08-first-component';
import Exercise09 from './exercises/09-conditional-rendering';
import Exercise10 from './exercises/10-styling';
import Exercise11 from './exercises/11-events';

function App() {
  return (
    <div>
      <h1 className="text-center my-4">Lab5 - React Exercises</h1>
      
      <div className="container">
        <h2>01 - Начало</h2>
        <Exercise01 />
        <hr />
        
        <h2>02 - Рендер объектов</h2>
        <Exercise02 />
        <hr />
        
        <h2>03 - Построение макета</h2>
        <Exercise03 />
        <hr />
        
        <h2>04 - Построение из массивов</h2>
        <Exercise04 />
        <hr />
        
        <h2>05 - Отображение массива в li</h2>
        <Exercise05 />
        <hr />
        
        <h2>06 - Отображение массива объектов в li</h2>
        <Exercise06 />
        <hr />
        
        <h2>07 - Рендеринг с помощью функций</h2>
        <Exercise07 />
        <hr />
        
        <h2>08 - Первый функциональный компонент</h2>
        <Exercise08 />
        <hr />
        
        <h2>09 - Условный рендеринг</h2>
        <Exercise09 />
        <hr />
        
        <h2>10 - Добавление стилей</h2>
        <Exercise10 />
        <hr />
        
        <h2>11 - Прослушивание событий</h2>
        <Exercise11 />
      </div>
    </div>
  );
}

export default App;
