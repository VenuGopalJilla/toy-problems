from lru import lru

class lruTest():
    
    def __init__(self):
        self.LRU = lru()

    def testPut(self, item):
        return self.LRU.put(item)

    def testGet(self, item):
        return self.LRU.get(item)

    def testGet_cache(self):
        return self.LRU.get_cache()


def main():
    lt = lruTest()
    assert lt.testPut(1) == True
    assert lt.testPut(2) == True
    assert lt.testPut(3) == True
    assert lt.testPut(4) == True
    assert lt.testPut(5) == True
    assert [1,2,3,4,5] == lt.testGet_cache()
    assert True == lt.testGet(5)
    assert lt.testPut(1) == True
    assert [2,3,4,5,1] == lt.testGet_cache()


if __name__ == '__main__':
    main()