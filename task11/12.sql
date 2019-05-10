
SELECT count(*), user_id
from photo_post
where  CREATION_DATE like "2019-05-09%"
group by user_id
