---
layout: post
title:  "Python import magic"
date:   2016-04-13 10:11:26
categories: coding
---

Ever wondered how to make package export both its submodules for use with `from package import *` and re-export module members for use with
`from package import ClassName`? Well, you can of course specify `__all__` and
then do `from .module import *` for each module, but that's repeating yourself!

Instead, here's a black magic (not really) technique which requires to specify
each module only once.

<cut/>

```python
# __init__.py
__all__ = [...]
from . import *

for module in __all__:
    m = globals()[module]
    
    try:
        all_attrs = m.__all__
    except AttributeError:
        all_attrs = [name for name in dir(m) if name[0] != '_']
    for name in all_attrs:
        globals()[name] = getattr(m, name)
```

Now, there are a lot of reasons not to use this. Somebody would argue that it's
a bad idea to re-export module members in package and that is correct in lots of
cases. So only use this if you really know what are you doing and why.
