import * as Dialog from "@radix-ui/react-dialog";

function MyModal() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button>Open Modal</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed bg-white p-4 shadow-md rounded-md top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Dialog.Title>Edit Folder</Dialog.Title>
          <Dialog.Description>
            Enter a new name for the folder.
          </Dialog.Description>
          <input className="border p-2 mt-2 w-full" placeholder="Folder Name" />
          <div className="mt-4 flex justify-end gap-2">
            <Dialog.Close asChild>
              <button className="btn-secondary">Cancel</button>
            </Dialog.Close>
            <button className="btn-primary">Save</button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default MyModal;
