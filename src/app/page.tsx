export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
              Создание сайтов-визиток
              <span className="block text-blue-600">без хлопот</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Профессиональные сайты для вашего бизнеса. Мы возьмем на себя все технические детали: от дизайна до хостинга и домена.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <a
                  href="#packages"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                >
                  Выбрать пакет
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Наши услуги</h2>
            <p className="mt-4 text-lg text-gray-500">
              Полный цикл создания сайта от идеи до запуска
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900">Дизайн и разработка</h3>
              <p className="mt-2 text-gray-500">Современный дизайн и адаптивная верстка</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900">Регистрация домена</h3>
              <p className="mt-2 text-gray-500">Помощь в выборе и регистрации домена</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900">Хостинг и поддержка</h3>
              <p className="mt-2 text-gray-500">Надежный хостинг и техническая поддержка</p>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Пакеты услуг</h2>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-gray-50 p-8 rounded-lg shadow">
              <h3 className="text-2xl font-bold text-gray-900">Базовый</h3>
              <p className="mt-4 text-gray-500">Простой сайт без домена и хостинга</p>
              <p className="mt-8">
                <span className="text-4xl font-bold text-gray-900">10 000 ₽</span>
              </p>
              <ul className="mt-6 space-y-4">
                <li className="flex items-center">
                  <span className="text-green-500">✓</span>
                  <span className="ml-2 text-gray-500">До 5 страниц</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500">✓</span>
                  <span className="ml-2 text-gray-500">Адаптивный дизайн</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500">✓</span>
                  <span className="ml-2 text-gray-500">Форма обратной связи</span>
                </li>
              </ul>
            </div>
            <div className="bg-blue-50 p-8 rounded-lg shadow border-2 border-blue-500">
              <h3 className="text-2xl font-bold text-gray-900">Стандарт</h3>
              <p className="mt-4 text-gray-500">Сайт с доменом и хостингом</p>
              <p className="mt-8">
                <span className="text-4xl font-bold text-gray-900">20 000 ₽</span>
              </p>
              <ul className="mt-6 space-y-4">
                <li className="flex items-center">
                  <span className="text-green-500">✓</span>
                  <span className="ml-2 text-gray-500">Все из Базового</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500">✓</span>
                  <span className="ml-2 text-gray-500">Регистрация домена</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500">✓</span>
                  <span className="ml-2 text-gray-500">Хостинг на 1 год</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500">✓</span>
                  <span className="ml-2 text-gray-500">SSL сертификат</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg shadow">
              <h3 className="text-2xl font-bold text-gray-900">Премиум</h3>
              <p className="mt-4 text-gray-500">Расширенный сайт с поддержкой</p>
              <p className="mt-8">
                <span className="text-4xl font-bold text-gray-900">30 000 ₽</span>
              </p>
              <ul className="mt-6 space-y-4">
                <li className="flex items-center">
                  <span className="text-green-500">✓</span>
                  <span className="ml-2 text-gray-500">Все из Стандарт</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500">✓</span>
                  <span className="ml-2 text-gray-500">Интеграция с соцсетями</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500">✓</span>
                  <span className="ml-2 text-gray-500">SEO оптимизация</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500">✓</span>
                  <span className="ml-2 text-gray-500">Поддержка 6 месяцев</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Связаться с нами</h2>
            <p className="mt-4 text-lg text-gray-500">
              Готовы начать? Напишите нам и мы обсудим ваш проект
            </p>
          </div>
          <div className="mt-10 max-w-md mx-auto">
            <form className="grid grid-cols-1 gap-6">
              <input
                type="text"
                placeholder="Ваше имя"
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="email"
                placeholder="Email"
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              <textarea
                rows={4}
                placeholder="Опишите ваш проект"
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Отправить
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
