import redis

from settings import REDIS_URL
from loguru import logger


class RedisClient(object):
    def __init__(self, db=0):
        self.logger = logger
        self.db = db
        self.__conn = None
        self.redis_uri = "{0}/{1}".format(REDIS_URL[:REDIS_URL.rfind("/")], db)

    def _get_conn(self):
        if not self.__conn:
            self.logger.info("===>Get redis connect from {0}".format(self.redis_uri))
            self.__conn = redis.from_url(url=self.redis_uri)
        return self.__conn

    @property

if __name__ == '__main__':
t1 = RedisClient()
t2 = RedisClient()
print(t1 is t2)
print(t1.test())