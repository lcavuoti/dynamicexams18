# Konstruktoren
Gegeben ist der folgende Konstruktor:

```java
public XYZUi(String state, int node) {
	this.state = state;
	this.node = node;
}
```
Überlegen Sie sich wie die Eigenschaften der Klasse definiert sein müssen, wenn dieser Konstruktor Sinn machen soll. Schreiben Sie die Klasse auf.

---
Vorschlag 1:
```java
private String state;
private int node;
```
---
Vorschlag 2:
```java
private String state;
private String node;
```
---
Vorschlag 3:
```java
private int state;
private String node;
```

[comment]: <> ({
    "type": "multiplechoice", 
    "level": 1,
    "answers": ["Pizza", "RAM", "ROM"],
    "solution": [1,2]
})
