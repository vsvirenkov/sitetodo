export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-xl font-bold text-white">SiteToDo</span>
            <p className="mt-1 text-sm">Профессиональное создание сайтов-визиток</p>
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="/#packages" className="hover:text-white transition-colors">Пакеты</a>
            <a href="/#contact" className="hover:text-white transition-colors">Контакты</a>
            <a href="/login" className="hover:text-white transition-colors">Личный кабинет</a>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-4 text-center text-sm">
          © {new Date().getFullYear()} SiteToDo. Все права защищены.
        </div>
      </div>
    </footer>
  )
}
