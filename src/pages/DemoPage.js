import React from 'react'

function DemoPage() {
    return (
        <div class="p-6 max-w-sm mx-auto bg-grey-200 rounded-xl outline-black   shadow-md flex items-center space-x-4">
  <div class="flex-shrink-0">
    <img class="h-12 w-12" src="../error.svg" alt="ChitChat Logo" />
  </div>
  <div>
    <div class="text-xl font-medium text-green-500">ChitChat</div>
    <p class="text-gray-500">You have a new message!</p>
  </div>
</div>
    )
}

export default DemoPage
