import post1 from "../assets/image/software.jpeg";
const PostCard = () => {
  return (
    <section className="max-w-screen-md mx-auto px-4 py-8">
      {/* Post Card */}
      <div className="flex flex-col md:flex-row gap-4 border-b border-gray-200 pb-6 mb-6">
        {/* Text Content */}
        <div className="flex-1">
          <div className="text-sm text-gray-500">Rohat Filitoğlu </div>
          <h2 className="text-xl font-bold text-gray-900 mt-1 hover:underline cursor-pointer ">
            SQl Komutlarinin Analizi: Veritabani Yonetiminin Temelleri
          </h2>
          <p className="text-gray-600 mt-2 line-clamp-2">
            Bu yazıda JSONPlaceholder API ile nasıl veri çekeceğimizi ve bunu
            React ile nasıl göstereceğimizi adım adım inceleyeceğiz...
          </p>
          <div className="flex items-center space-x-6 mt-4 text-gray-500 text-sm">
            {/* Tarih */}
            <time className="whitespace-nowrap">· Jul 3</time>

            {/* Alkış Butonu */}
            <button
              type="button"
              className="flex items-center space-x-2 px-3 py-1 rounded-full font-semibold text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
              aria-label="Clap"
            >
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 11c.889-.086 1.416-.543 2.156-1.057a22.323 22.323 0 003.958-5.084 1.6 1.6 0 01.582-.628 1.549 1.549 0 011.466-.087c.205.095.388.233.537.406a1.64 1.64 0 01.384 1.279l-1.388 4.114M7 11H4v6.5A1.5 1.5 0 005.5 19v0A1.5 1.5 0 007 17.5V11zm6.5-1h4.915c.286 0 .372.014.626.15.254.135.472.332.637.572a1.874 1.874 0 01.215 1.673l-2.098 6.4C17.538 19.52 17.368 20 16.12 20c-2.303 0-4.79-.943-6.67-1.475" />
              </svg>
              <span>123</span>
            </button>
          </div>
        </div>

        {/* Thumbnail (optional) */}
        <div className="w-full md:w-40 h-28 flex-shrink-0">
          <img
            src={post1}
            alt="post görseli"
            className="w-full h-full object-cover rounded"
          />
        </div>
      </div>
    </section>
  );
};

export default PostCard;
