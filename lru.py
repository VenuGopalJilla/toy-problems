

class lru():

    def __init__(self):
        self.cache = []
    
    def put(self, item):
        if (len(self.cache) == 5):
            if item in self.cache:
                self.cache.remove(item)
                self.cache.append(item)
                return True
            else:
                self.cache.pop(0)
                self.cache.append(item)
                return True
        else :
            if item in self.cache :
                self.cache.remove(item)
                self.cache.append(item)
                return True
            else:
                self.cache.append(item)
                return True

    def get(self, item):
        return item in self.cache

    def get_cache(self):
        return self.cache


def main():
    l = lru()
    l.put(1)
    l.put(2)
    l.put(3)
    print(l.get_cache())
    l.put(4)
    print(l.get_cache())
    l.put(3)
    print(l.get_cache())
    l.put(5)
    print(l.get_cache())
    print(l.get(5))
    l.put(1)
    print(l.get_cache())



if __name__ == '__main__':
    main()