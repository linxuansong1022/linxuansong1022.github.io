# React + TypeScript 阅读笔记

这份笔记的目标不是让你马上写完整前端，而是帮你看懂 React + TypeScript 代码在做什么。

## 1. HTML 基本结构

HTML 是网页的骨架。

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My Page</title>
  </head>
  <body>
    <h1>Hello</h1>
    <p>This is my page.</p>
  </body>
</html>
```

- `head`：网页信息，不直接显示在页面上。
- `body`：真正显示在网页上的内容。
- React 里的 JSX 很像 HTML。

## 2. JSX 是什么

JSX 是 React 里写页面结构的语法，长得像 HTML，但可以插入 JavaScript。

```tsx
return (
  <div className="widget">
    <h3>Counter Widget</h3>
    <p>{count}</p>
  </div>
);
```

重点：

- `return (...)` 里面通常是 JSX。
- `{count}` 表示把 JavaScript 变量显示到页面上。
- `className` 类似 HTML 的 `class`。

## 3. useState：组件自己的状态

`useState` 用来保存会影响页面显示的数据。

```tsx
const [count, setCount] = useState(0);
```

意思是：

- `count`：当前值。
- `setCount`：修改 `count` 的函数。
- `0`：初始值。

正确修改状态：

```tsx
setCount(count + 1);
```

更稳的写法：

```tsx
setCount(prev => prev + 1);
```

不要直接改：

```tsx
count = count + 1; // 不推荐，也通常会报错
```

最重要：

```text
普通变量变了，页面不一定更新。
state 变了，React 会重新渲染页面。
```

## 4. useEffect：渲染后做额外事情

`useEffect` 用来处理副作用，比如定时器、请求数据、监听事件。

```tsx
useEffect(() => {
  const timer = setInterval(() => {
    setTime(new Date());
  }, 1000);

  return () => clearInterval(timer);
}, []);
```

结构：

```tsx
useEffect(() => {
  // 做事情

  return () => {
    // 清理事情
  };
}, [依赖]);
```

重点：

- `[]` 表示组件第一次显示后执行一次。
- `[theme]` 表示 `theme` 变化时重新执行。
- `return () => ...` 是清理函数。

不要把定时器直接写在组件函数里：

```tsx
if (showBadExample) {
  setTimeout(() => {
    setTime(new Date());
  }, 1000);
}
```

因为组件每次渲染都会重新执行这段代码，可能不停创建新的 timer。

## 5. Props：父组件传给子组件的参数

Props 就是组件的参数。

```tsx
function Button({ variant, children, onClick }) {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick}>
      {children}
    </button>
  );
}
```

使用：

```tsx
<Button variant="primary" onClick={() => alert('Hello')}>
  Save
</Button>
```

这里：

- `variant="primary"`：控制样式。
- `onClick={...}`：控制点击行为。
- `Save`：是 `children`，控制按钮里显示什么。

`variant` 和 `children` 是两回事：

```tsx
<Button variant="primary">
  Secondary Button
</Button>
```

这个按钮会长得像 primary，但文字是 `Secondary Button`。

## 6. TypeScript interface：说明数据长什么样

`interface` 用来描述一个对象应该有哪些字段。

```tsx
interface User {
  name: string;
  email: string;
}
```

意思是：

```text
User 必须有 name 和 email，并且都是字符串。
```

常见类型：

```tsx
id: number;
name: string;
completed: boolean;
children: React.ReactNode;
onClick?: () => void;
```

`?` 表示可选：

```tsx
onClick?: () => void;
```

意思是可以传，也可以不传。

## 7. 条件渲染：根据状态显示不同内容

条件渲染本质就是 if / else。

```tsx
{loading && <div>Loading...</div>}
```

意思是：

```text
如果 loading 是 true，就显示 Loading。
```

三元表达式：

```tsx
{user ? <div>Hello {user.name}</div> : <div>Please log in</div>}
```

意思是：

```text
如果 user 有值，显示用户信息。
否则显示 Please log in。
```

常见状态：

```tsx
{loading && <div>Loading user data...</div>}
{error && <div>Error: {error}</div>}
{user && <div>Name: {user.name}</div>}
{!loading && !error && !user && <div>Please log in</div>}
```

最重要：

```text
React 不是手动隐藏/显示 DOM。
React 是根据 state 决定 JSX 要不要出现。
```

## 8. 列表渲染：用 map 显示数组

如果有一组数据：

```tsx
const todos = [
  { id: 1, text: 'Learn React', completed: true },
  { id: 2, text: 'Learn TypeScript', completed: false },
];
```

用 `map` 显示：

```tsx
{todos.map(todo => (
  <div key={todo.id}>
    {todo.completed ? 'Done' : 'Todo'} {todo.text}
  </div>
))}
```

重点：

- `map()`：把数组里的每一项变成 JSX。
- `key`：给 React 用的身份证，帮助 React 分清楚每一行。
- `key` 最好用稳定唯一的 `id`。

## 9. 更新数组状态

不要直接改原数组，通常创建一个新数组。

切换某条 todo：

```tsx
const toggleTodo = (id: number) => {
  setTodos(todos.map(todo =>
    todo.id === id
      ? { ...todo, completed: !todo.completed }
      : todo
  ));
};
```

意思是：

```text
检查每一条 todo。
如果是被点击的那条，就复制它并修改 completed。
其他 todo 保持不变。
```

删除某条：

```tsx
setTodos(todos.filter(todo => todo.id !== id));
```

意思是：

```text
只保留 id 不等于目标 id 的项目。
```

## 10. 表单：用 state 保存输入框内容

React 里常见写法是受控组件。

```tsx
const [formData, setFormData] = useState({
  name: '',
  email: '',
});
```

输入框：

```tsx
<input
  name="email"
  value={formData.email}
  onChange={handleChange}
/>
```

处理输入：

```tsx
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;

  setFormData(prev => ({
    ...prev,
    [name]: value,
  }));
};
```

重点：

- `value`：输入框显示的值来自 React state。
- `onChange`：用户打字时更新 state。
- `name`：告诉 `handleChange` 当前改的是哪个字段。

## 11. 表单提交

```tsx
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  if (!formData.email.includes('@')) {
    setError('Valid email required');
    return;
  }

  submitForm(formData);
};
```

重点：

- `e.preventDefault()`：阻止浏览器刷新页面。
- `return`：有错误时停止继续执行。
- `onSubmit={handleSubmit}`：表单提交时执行函数。

```tsx
<form onSubmit={handleSubmit}>
  <button type="submit">Send</button>
</form>
```

## 12. useMemo：缓存计算结果

`useMemo` 用来缓存计算结果。

```tsx
const stats = useMemo(() => {
  return {
    total: notes.length,
    long: notes.filter(note => note.length > 10).length,
  };
}, [notes]);
```

意思是：

```text
notes 没变，就用上次算好的 stats。
notes 变了，才重新计算。
```

最重要：

```text
useMemo 是性能优化，不是必须。
它缓存的是“计算结果”。
```

## 13. useCallback：缓存函数

`useCallback` 用来缓存函数。

```tsx
const addNote = useCallback(() => {
  setNotes([...notes, newNote]);
}, [notes, newNote]);
```

意思是：

```text
依赖没变，就复用上一次的函数。
依赖变了，才创建新函数。
```

最重要：

```text
useMemo 缓存值。
useCallback 缓存函数。
```

## 14. Context API：公共数据盒子

Context 用来共享全局数据，比如主题、语言、登录用户。

核心三步：

### 1. 创建盒子

```tsx
const ThemeContext = createContext(undefined);
```

### 2. Provider 放数据

```tsx
<ThemeContext.Provider value={{ theme, toggleTheme }}>
  {children}
</ThemeContext.Provider>
```

`Provider` 是提供者。

意思是：

```text
把 theme 和 toggleTheme 提供给被包住的所有组件。
```

### 3. useContext 取数据

```tsx
const context = useContext(ThemeContext);
```

项目里封装成了：

```tsx
const { theme, toggleTheme } = useTheme();
```

一句话：

```text
createContext 创建盒子。
Provider 放数据。
useContext 取数据。
```

## 15. Prop Drilling 和 Context 的区别

不好的方式：一层层传 props。

```tsx
function App() {
  return <Header theme={theme} />;
}

function Header({ theme }) {
  return <Nav theme={theme} />;
}

function Nav({ theme }) {
  return <ThemeButton theme={theme} />;
}
```

问题：

```text
Header 和 Nav 可能自己不用 theme，
但被迫接收并继续传下去。
```

好的方式：用 Context。

```tsx
function ThemeButton() {
  const { theme, toggleTheme } = useTheme();
}
```

意思是：

```text
需要 theme 的组件，自己从公共盒子里拿。
```

## 16. Custom Hook：自己封装的 Hook

自定义 Hook 就是把重复逻辑打包起来。

```tsx
const [notes, setNotes] = useLocalStorage<string[]>('tutorial-notes', []);
```

它看起来像 `useState`，但额外做了 localStorage 保存。

普通 `useState`：

```tsx
const [notes, setNotes] = useState<string[]>([]);
```

自定义 `useLocalStorage`：

```tsx
const [notes, setNotes] = useLocalStorage<string[]>('tutorial-notes', []);
```

区别：

```text
useState：刷新后数据没了。
useLocalStorage：刷新后数据还在。
```

## 17. JSX 里常见括号

### 圆括号

```tsx
return (
  <div>Hello</div>
);
```

圆括号只是为了多行写 JSX。

### 标签包裹

```tsx
<ThemeProvider>
  {children}
</ThemeProvider>
```

意思是 `ThemeProvider` 包住了 `children`。

### 大括号插入 JS

```tsx
<div>{count}</div>
```

意思是在 JSX 里显示 JavaScript 变量 `count`。

### 双大括号

```tsx
value={{ theme, toggleTheme }}
```

外层 `{}`：JSX 里写 JavaScript。

内层 `{}`：JavaScript 对象。

等价于：

```tsx
value={{
  theme: theme,
  toggleTheme: toggleTheme,
}}
```

## 18. 阅读 React 组件的顺序

看一个组件时，按这个顺序读：

1. 看组件名字：它负责页面哪一块？
2. 看 `useState`：它有哪些状态？
3. 看普通函数：用户点击/输入后发生什么？
4. 看 `useEffect`：页面加载后自动做什么？
5. 看 `return`：页面长什么样？
6. 看 `onClick` / `onChange` / `onSubmit`：事件触发哪个函数？
7. 看 `map`：是不是在显示列表？
8. 看 props：父组件传了什么给子组件？

最重要的阅读公式：

```text
state 是数据。
function 是动作。
useEffect 是自动动作。
return 是页面。
props 是传参。
map 是列表。
&& 和 ? : 是条件显示。
```

## 19. 最核心总结

React 代码大多数都在回答这几个问题：

```text
现在有什么数据？          useState / props / context
用户做了什么？            onClick / onChange / onSubmit
数据怎么变化？            setState
页面怎么根据数据变化？    JSX / 条件渲染 / map
哪些事情要自动发生？      useEffect
哪些逻辑被复用？          custom hook
```

如果你能顺着这几个问题读代码，就能看懂大部分 React + TypeScript 前端代码。
