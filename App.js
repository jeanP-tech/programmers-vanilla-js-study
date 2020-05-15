function App () {

  this.data = [
    {
      text: 'JS 공부하기',
      isCompleted: true
    },
    {
      text: 'JS 복습하기',
      isCompleted: false
    }
  ]

  document.querySelector('#todo-list').addEventListener("click", (e) => {
    const targetTagName = e.target.tagName

    if (targetTagName === "BUTTON") {
      const idx = e.target.parentNode.getAttribute('data-index')
      const nextData = [...this.data]
      nextData.splice(idx, 1)

      this.setState(nextData)
    } else if (targetTagName === "LI"){
      const idx = e.target.getAttribute('data-index')
      const nextData = [...this.data]
      nextData[idx].isCompleted = true

      this.setState(nextData)
    }
  })

  const $todoList = document.querySelector('#todo-list');

  document.querySelector('#remove-btn').addEventListener('click', () => {
    $todoList.dispatchEvent(new CustomEvent('removeAll'))
  })

  $todoList.addEventListener('removeAll', () => {
    this.setState([])
  })

  this.setState = (nextData)  => {
    if (JSON.stringify(nextData) !== JSON.stringify(this.data)) {
      this.data = nextData
      this.todoList.setState(nextData)
      this.todoCount.setState(nextData)
    }
  }

  this.render = () => {
    this.todoList = new TodoList(document.querySelector('#todo-list'), this.data)
    this.todoCount = new TodoCount(document.querySelector('#todo-count'), this.data)
    this.todoInput = new TodoInput(document.querySelector('#todo-input'), {
      onAddTodo: (text) => {
        const nextData = [
          ...this.data,
          {
            text: text,
            isCompleted: false
          }
        ]

        this.setState(nextData)
      }
    })
  }

  this.render()
}

new App()
