import React, { useState, useEffect, ChangeEvent, useMemo, useRef, createRef } from 'react';
import { getData, saveData } from "../../../utils/storage"; // for data localstorage
import { useAppContext } from "../../../context/AppContext"; // for events updates
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";
import Alert from "react-bootstrap/Alert";
import { useTheme } from "../../../hooks/useTheme";
import "../../../animation/slide-right.css";
import "../../../animation/fade.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";
interface Todo {
  id: string;
  text: string;
}

const TodoList: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const { user } = useAppContext();
  const [msg, setMsg] = useState<string>("");
  const theme = useTheme();
  const isDarkTheme = theme === 'dark';

  // Load todos from localStorage
  const initTodo = (): Todo[] => {
    let todos: Todo[] = []
    try {
      const storedTodos = getData<Todo[]>('todos')// localStorage.getItem('todos');
      if (storedTodos) {
          todos = storedTodos;
      }
    } catch (error) {
      console.error('Error loading todos from localStorage:', error);
    }
    return todos;
  };

  const [todos, setTodos] = useState<Todo[]>(initTodo);
  const [query, setQuery] = useState('');

  // Memoize filtered results for performance
  const filtered = useMemo(() => {
    const lower = query.toLowerCase();
    if (!lower) return todos;
    return todos.filter(item => item.text.toLowerCase().includes(lower));
  }, [query, todos]);

  // Save todos to localStorage
  useEffect(() => {
    try {
      saveData('todos', todos); // localStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {
      console.error('Error saving todos to localStorage:', error);
    }
  }, [todos]);

  useEffect(() => {
    try {
      // console.log('user changed:', user);
      if (user){
        setMsg(user);
      }
    } catch (error) {
      console.error('Error saving todos to localStorage:', error);
    }
  }, [user]);


  const handleAdd = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    if (todos.some(todo => todo.text === trimmed)) return;

    const newTodo: Todo = {
      id: `todo_${Date.now()}`,
      text: trimmed
    };

    setTodos([...todos, newTodo]);
    setInput('');
  };

  const handleDelete = (idToDelete: string) => {
    const filteredTodos = todos.filter(todo => todo.id !== idToDelete);
    setTodos(filteredTodos);
  };

  // Manage refs for each list item to avoid findDOMNode
  const nodeRefs = useRef<Record<string, React.RefObject<any>>>({});

  return (
    <Container fluid="md" className="py-4">
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8} xl={6}>
          <Card className={`shadow-sm ${isDarkTheme ? 'bg-dark text-white border-secondary' : ''}`}>
            <Card.Header className={isDarkTheme ? 'bg-dark text-white border-secondary' : 'bg-white'}>
              <div className="d-flex justify-content-between align-items-center">
                <h3 className="mb-0 d-flex align-items-center gap-2">
                  <FontAwesomeIcon icon={faListCheck} />
                  <span>To-Do List</span>
                </h3>
                <Badge bg="primary" pill>
                  {todos.length}
                </Badge>
              </div>
            </Card.Header>
            <Card.Body className={isDarkTheme ? 'bg-dark text-white' : undefined}>
              <Stack gap={3}>
                {msg && (
                  <Alert variant={isDarkTheme ? 'secondary' : 'info'} className={isDarkTheme ? 'mb-0 text-white bg-dark border-secondary' : 'mb-0'}>
                    <strong>User message:</strong> {msg}
                  </Alert>
                )}

                <Form>
                  <Row className="g-3 align-items-end">
                    <Col md={8}>
                      <Form.Group controlId="todoInput">
                        <Form.Label className={isDarkTheme ? 'text-white' : undefined}>Add a task</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter a to-do item"
                          value={input}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
                          className={isDarkTheme ? 'bg-dark text-white border-secondary' : undefined}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4} className="d-grid">
                      <Button onClick={handleAdd} disabled={!input.trim()}>
                        Add Item
                      </Button>
                    </Col>
                  </Row>
                </Form>

                <Form.Group controlId="todoSearch">
                  <Form.Label className={isDarkTheme ? 'text-white' : undefined}>Search your todos</Form.Label>
                  <InputGroup>
                    <InputGroup.Text
                      id="search-label"
                      className={isDarkTheme ? 'bg-dark text-white border-secondary' : undefined}
                    >
                      Search
                    </InputGroup.Text>
                    <Form.Control
                      type="search"
                      placeholder="Type to search..."
                      value={query}
                      onChange={e => setQuery(e.target.value)}
                      aria-describedby="search-label"
                      className={isDarkTheme ? 'bg-dark text-white border-secondary' : undefined}
                    />
                  </InputGroup>
                </Form.Group>

                <ListGroup
                  variant="flush"
                  className={`border rounded ${isDarkTheme ? 'bg-dark text-white border-secondary' : ''}`}
                >
                  <TransitionGroup component={null}>
                    {filtered.map(todo => {
                      let ref = nodeRefs.current[todo.id];
                      if (!ref) {
                        ref = createRef<HTMLLIElement>();
                        nodeRefs.current[todo.id] = ref;
                      }

                      return (
                        <CSSTransition key={todo.id} nodeRef={ref} timeout={300} classNames="slide">
                          <ListGroup.Item
                            ref={ref}
                            className={`d-flex justify-content-between align-items-center py-3 ${isDarkTheme ? 'bg-dark text-white border-secondary' : ''}`}
                          >
                            <span className="me-3 flex-grow-1">{todo.text}</span>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => handleDelete(todo.id)}
                            >
                              Delete
                            </Button>
                          </ListGroup.Item>
                        </CSSTransition>
                      );
                    })}
                  </TransitionGroup>
                  {filtered.length === 0 && (
                    <ListGroup.Item className={`text-center py-4 ${isDarkTheme ? 'bg-dark text-white border-secondary' : 'text-muted'}`}>
                      Nothing to show yet. Try adding a new task above!
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Stack>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TodoList;
