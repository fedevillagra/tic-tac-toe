import Link from "next/link"

const modes = [
  {
    name: "Classic",
    href: '#',
    imageSrc: 'icon-classic.png',
    imageAlt: 'Classic mode image',
    description: 'Just fill the board with the pieces.',
  },
  {
    name: "Moving",
    href: 'components/DragDrop',
    imageSrc: 'icon-moving.gif',
    imageAlt: 'Moving mode image',
    description: 'Move your pieces after putting all three of yours.',
  },
  {
    name: 'No middle',
    href: '#',
    imageSrc: 'icon-no-middle.gif',
    imageAlt: 'No middle mode image',
    description: "The first piece can't be put it in the middle.",
  },
]

export default function TicTacToe() {
  return (
    <div className="relative bg-white">
      {/* Background image and overlap */}
      <div aria-hidden="true" className="absolute inset-0 hidden sm:flex sm:flex-col">
        <div className="w-full flex-1 bg-gray-800">
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="white-and-silver-hexagon.jpg" //imagen de fondo
              alt=""
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="absolute inset-0 bg-gray-900 opacity-50" />
        </div>
        <div className="h-32 w-full bg-white md:h-40 lg:h-48" />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 pb-96 text-center sm:px-6 sm:pb-0 lg:px-8">
        {/* Background image and overlap */}
        <div aria-hidden="true" className="absolute inset-0 flex flex-col sm:hidden">
          <div className="relative w-full flex-1 bg-gray-800">
            <div className="absolute inset-0 overflow-hidden">
              <img
                src="white-and-silver-hexagon.jpg" //imagen de fondo
                alt=""
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="absolute inset-0 bg-gray-900 opacity-50" />
          </div>
          <div className="h-48 w-full bg-white" />
        </div>
        <div className="relative py-16">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">Tic Tac Toe</h1>
          <div className="mt-4 sm:mt-6">
            <h3
              className="inline-block rounded-md  py-3 px-8 font-medium text-white bg-black"
            >
              Choose game mode below!
            </h3>
          </div>
        </div>
      </div>

      <section aria-labelledby="collection-heading" className="relative -mt-96 pb-10 sm:mt-0">
        <h2 id="collection-heading" className="sr-only">
          modes
        </h2>
        <div className="mx-auto grid max-w-md grid-cols-1 gap-y-6 px-4 sm:max-w-7xl sm:grid-cols-3 sm:gap-y-0 sm:gap-x-6 sm:px-6 lg:gap-x-8 lg:px-8">
          {modes.map((mode) => (
            <div
              key={mode.name}
              className="group relative h-96 rounded-lg bg-white shadow-xl sm:aspect-w-4 sm:aspect-h-5 sm:h-auto"
            >
              <div>
                <div aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-lg">
                  <div className="absolute inset-0 overflow-hidden group-hover:opacity-75">
                    <img
                      src={mode.imageSrc}
                      alt={mode.imageAlt}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50" />
                </div>
                <div className="absolute inset-0 flex items-end rounded-lg p-6">
                  <div>
                    <h3 className="mt-1 text-xl font-semibold text-white">
                      <Link href={mode.href}>
                        <span className="absolute inset-0" />
                        {mode.name}
                      </Link>
                    </h3>
                    <p aria-hidden="true" className="text-sm text-white">
                      {mode.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
