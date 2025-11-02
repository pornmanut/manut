---
title: "Using the set() Function on Class Objects in Python"
description: "Learn how to use the set() function to compare class objects in Python."
pubDate: 2024-05-09
tags: ["Python", "Programming", "Work"]
heroImage: "/images/00002_set_abstract.jpg"
featured: false
---

Image created by AI through stable diffusion

Our team needs to design an application that retrieves data from a database using an ID provided in a request. The goal is to compare the data from the request with the results from the database, and identify any data that is not found in the database. This missing data should then be sent back in response to the request.

In our discussions about potential solutions, we determined that we could use the `set()` function to compare the data from the request with the data from the database.

## Set Operations in Python

Python's set data type provides a variety of operations that you can perform. These operations are similar to the ones you would perform with mathematical sets. They include:

* **Union**: The union of two sets is a set of all elements from both sets. In Python, you can use the `union()` method or the `|` operator.
* **Intersection**: The intersection of two sets is a set of all elements that are common to both sets. You can use the `intersection()` method or the `&` operator.
* **Difference**: The difference of the set `A` from the set `B` (`A - B`) is a set of elements that are only in `A` but not in `B`. Similarly, `B - A` is a set of elements in `B` but not in `A`. You can use the `difference()` method or the `-` operator.
* **Symmetric Difference**: The symmetric difference of two sets is a set of elements that are in either of the sets but not in their intersection. You can use the `symmetric_difference()` method or the `^` operator.

Here are these operations in action:

```python
set1 = {1, 2, 3, 4, 5}
set2 = {4, 5, 6, 7, 8}

# Union
print(set1.union(set2))  # {1, 2, 3, 4, 5, 6, 7, 8}
print(set1 | set2)  # {1, 2, 3, 4, 5, 6, 7, 8}

# Intersection
print(set1.intersection(set2))  # {4, 5}
print(set1 & set2)  # {4, 5}

# Difference
print(set1.difference(set2))  # {1, 2, 3}
print(set1 - set2)  # {1, 2, 3}

# Symmetric Difference
print(set1.symmetric_difference(set2))  # {1, 2, 3, 6, 7, 8}
print(set1 ^ set2)  # {1, 2, 3, 6, 7, 8}
```

## Converting a List to a Set in Python

In Python, if you have a list of data and you want to convert it to a set, you can use the `set()` function. The `set()` function ensures that there are no duplicate data in the set.

```python
data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
data_set = set(data)
print(data_set)
```

The result will be `{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}`.

## Converting a Class Object to a Set

If you want to convert a class object to a set, you can also use the `set()` function. However, you must ensure that you have implemented the `__hash__` and `__eq__` methods in your class.

```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def __hash__(self):
        return hash((self.name, self.age))

    def __eq__(self, other):
        return self.name == other.name and self.age == other.age

    def __repr__(self):
        return f'Person(name={self.name}, age={self.age})'

person1 = Person('John', 25)
person2 = Person('John', 25)
person3 = Person('John', 30)

person_set = set([person1, person2, person3])
print(person_set)
```

The result will be `{Person(name=John, age=25)}, {Person(name=John, age=30)}`.

## Choosing Variables for Comparison

With this method, you can choose which variable to compare. You can change it to any variable you want to compare.

```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def __hash__(self):
        return hash(self.name)

    def __eq__(self, other):
        return self.name == other.name

    def __repr__(self):
        return f'Person(name={self.name}, age={self.age})'

person1 = Person('John', 25)
person2 = Person('John', 25)
person3 = Person('John', 30)

person_set = set([person1, person2, person3])
print(person_set)
```

The result will be `{Person(name=John, age=25)}`.

## Using Dataclasses

You can also use dataclasses.

```python
from dataclasses import dataclass

@dataclass
class Person:
    name: str
    age: int

    def __hash__(self):
        return hash(self.name)

    def __eq__(self, other):
        return self.name == other.name

    def __repr__(self):
        return f'Person(name={self.name}, age={self.age})'

person1 = Person('John', 25)
person2 = Person('John', 25)
person3 = Person('John', 30)

person_set = set([person1, person2, person3])
print(person_set)
```

The result will be `{Person(name=John, age=25)}`.
