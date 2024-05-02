from dbs.mongo_db import MongoDB
from dbs.redis_db import RedisClient
from settings import CONSTANT_MONGO_DB_TASK_TABLE_NAME, TASK_DB
realdata_mongo_client = MongoDB(table='real_data_108keys')
predict_data_mongo_client = MongoDB(table='predict_data')