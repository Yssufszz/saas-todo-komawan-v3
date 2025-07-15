import { DocumentTextIcon } from '@heroicons/react/24/outline'

const EmptyState = ({ 
  icon: Icon = DocumentTextIcon,
  title = 'Tidak ada data',
  description = 'Belum ada data untuk ditampilkan',
  action = null,
  className = ''
}) => {
  return (
    <div className={`text-center py-16 ${className}`}>
      <div className="relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full opacity-20 animate-pulse"></div>
        </div>
        
        <div className="relative z-10 inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl mb-6 group hover:scale-110 transition-transform duration-300">
          <Icon className="h-10 w-10 text-gray-400 group-hover:text-gray-500 transition-colors duration-300" />
        </div>
      </div>
      
      <div className="max-w-sm mx-auto">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-500 leading-relaxed mb-6">{description}</p>
        
        {action && (
          <div className="transform hover:scale-105 transition-transform duration-200">
            {action}
          </div>
        )}
      </div>

      <div className="absolute top-4 left-4 w-2 h-2 bg-blue-300 rounded-full opacity-30 animate-ping"></div>
      <div className="absolute top-8 right-8 w-3 h-3 bg-purple-300 rounded-full opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-12 left-12 w-2 h-2 bg-pink-300 rounded-full opacity-40 animate-bounce" style={{animationDelay: '2s'}}></div>
    </div>
  )
}

export default EmptyState