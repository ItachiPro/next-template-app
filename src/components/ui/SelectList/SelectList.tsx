export enum SelectedColor {
  Blue = 'blue',
  Red = 'red',
}

type Props = {
  title: string
  itemList: string[]
  selected: string[]
  selectedColor?: SelectedColor
  hasError?: boolean
  onToggle: (value: string) => void
}

export const SelectList = ({
  title,
  itemList,
  selected,
  selectedColor,
  hasError = false,
  onToggle,
}: Props) => {
  const selectedStyles =
    selectedColor === SelectedColor.Blue
      ? 'bg-blue-100 text-blue-600'
      : 'bg-red-100 text-red-600'

  return (
    <div
      className={`w-1/2 border rounded p-4 h-64 flex flex-col ${hasError ? 'text-red-500' : 'text-gray-500'}`}
    >
      <h3 className="font-bold mb-2 whitespace-nowrap">{title}</h3>
      <ul className="overflow-y-auto flex-1">
        {itemList.map((item, index) => {
          const isSelected = selected.includes(item)

          return (
            <li
              key={`${item}-${index}`}
              onClick={() => onToggle(item)}
              className={`flex justify-between items-center py-2 px-2 cursor-pointer transition-colors ${
                isSelected ? selectedStyles : 'text-gray-500'
              }`}
            >
              {item}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
