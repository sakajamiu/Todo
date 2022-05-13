import React from 'react'
import { Form, ListGroup } from 'react-bootstrap'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import moon from '../../images/icon-moon.svg'
import sun from '../../images/icon-sun.svg'
import cancel from '../../images/icon-cross.svg'
import check from '../../images/icon-check.svg'
import styles from './index.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { changeTheme } from '../../reducer/themeReducer'
import {
  complete,
  clear ,
  createTodo ,
  active,
  Allcompleted,
  clearAllCompleted,
  updateTaskList
} from '../../reducer/todoReducer'
import useMediaQuery from '../../hooks/mediaQuery'


export const Todo = () => {
  const dispatch = useDispatch()
  const isLight  = useSelector(state => state.theme)
  const todo = useSelector(state => state.todo)
  const image = isLight? moon: sun
  const dark = isLight? '': 'Dark1'
  const spanControl = isLight? 'spanControl2': 'spanControl1'
  const remainingTask = todo.filter(task => task.completed !== true)
  const item = remainingTask <= 1? 'item': 'items'
  const mobileDevice = !useMediaQuery('(min-width: 480px)')

  const completed = (task) => {
    dispatch(complete(task))
  }
  const Active = () => {
    dispatch(active())
  }

  const deleteTask = (task) => {
    dispatch(clear(task))
  }
  const allCompleted = () => {
    dispatch(Allcompleted())
  }
  const createTask = (event) => {
    event.preventDefault()
    const task = {
      'name' : event.target.task.value,
      completed: false,
      'id' : event.target.task.value
    }
    event.target.task.value = ' '
    dispatch(createTodo(task))
  }
  const clearCompleted = () => {
    dispatch(clearAllCompleted())
  }
  function handleOnDragEnd(result) {
    if(!result.destination) return
    const tasks = Array.from(todo)
    const [reOrderTasks] = tasks.splice(result.source.index, 1)
    tasks.splice(result.destination.index,0,reOrderTasks)
    dispatch(updateTaskList(tasks))
  }
  return(
    <div className={styles.container} >
      <div>
        <h1 className={styles.header}>TODO
          <span className={styles.moon} onClick = {() => dispatch(changeTheme(isLight))}>
            <img src={image} alt='moon' className={styles.moon}/>
          </span>
        </h1>
      </div>
      <div>
        <Form className={styles.form} onSubmit = {createTask} >
          <Form.Control className={styles.input} placeholder='Create a new todo ...' name='task' id = {`${dark}`}/>
        </Form>
      </div>

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId='list'>
          {
            (provided) => (
              <ListGroup className={styles.ListGroup} {...provided.droppableProps} ref={provided.innerRef}>
                {

                  todo.map((task,index) =>

                    <Draggable key ={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <ListGroup.Item  id = {`${dark}`}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <label className={styles.formLabel} onClick={() => completed(task)}>

                            {
                              task.completed? <img src={check} alt='check' className={styles.radio}/>:
                                <input type="radio" id = {task.id} value ={task.name} className={styles.label} />
                            }

                          </label>
                          { task.completed? <s style={{ color:'grey' }}>{task.name}</s>: `${task.name}`
                          }{
                            mobileDevice?
                              <span className={styles.img}><img src ={cancel} alt='cancel' onClick={() => deleteTask(task)}/></span>:

                              <span className={styles.span}><img src ={cancel} alt='cancel' onClick={() => deleteTask(task)}/></span>
                          }
                        </ListGroup.Item>
                      )}
                    </Draggable>
                  )
                }
                {provided.placeholder}
              </ListGroup>

            )
          }

        </Droppable>

      </DragDropContext>
      <ListGroup className={styles.ListGroup2} >
        <ListGroup.Item className={styles.control} id ={`${dark}`}>
          <span className={styles.itemLeft}>{remainingTask.length} {item} {' '}left</span>
          {
            mobileDevice? ' ':
              <>
                <span className={styles.spanControl} id={`${spanControl}`}>All</span>
                <span className={styles.spanControl} id={`${spanControl}`} onClick = {() => Active()}>Active</span>
                <span className={styles.spanControl} id={`${spanControl}`} onClick={() => allCompleted()}>Completed</span>
              </>
          }
          <span className={styles.itemRight} onClick={() => clearCompleted()} >Clear Completed</span>
        </ListGroup.Item>
        {
          mobileDevice?

            <ListGroup.Item className={styles.mobileDiv} id = {`${dark}`}>
              <span className={styles.mobileSpan} id={`${spanControl}`}>All</span>
              <span className={styles.mobileSpan}id={`${spanControl}`} onClick = {() => Active()}>Active</span>
              <span className={styles.mobileSpan}id={`${spanControl}`} onClick={() => allCompleted()}>Completed</span>
            </ListGroup.Item>: ' '
        }
      </ListGroup>
      <p className={styles.p}>Drag and drop to reroder the list</p>
    </div>
  )
}
