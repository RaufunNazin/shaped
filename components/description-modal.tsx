import * as Dialog from "@radix-ui/react-dialog"

const DescriptionModal = ({ description }: { description: string }) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="underline">Click to view</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0 z-50 bg-gray-700/90 data-[state=open]:animate-overlay-show" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] divide-y-2 rounded-2xl bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-content-show">
          <Dialog.Title className="pb-2 text-lg font-bold text-black ">
            Description
          </Dialog.Title>

          <Dialog.Close asChild>
            <button
              className="absolute right-[10px] top-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center pr-8 pt-6"
              aria-label="Close"
            >
              Close
            </button>
          </Dialog.Close>

          <Dialog.Description className="text-mauve11 mb-5 mt-[10px] pt-4 text-[15px] leading-normal">
            <div className="max-h-72 max-w-lg overflow-y-auto">
              {description}
            </div>
          </Dialog.Description>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default DescriptionModal
