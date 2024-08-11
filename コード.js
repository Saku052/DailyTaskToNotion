function createPage() {
  const NOTION_API_KEY = PropertiesService.getScriptProperties().getProperty('Notion_Api_Key');
  const database_id = '54f5799894b04783be44097ae513fb26';

  const url = 'https://api.notion.com/v1/pages';
  const url2 = 'https://api.notion.com/v1/databases/' + database_id + '/query';

  let headers = {
    'content-type' : 'application/json; charset=UTF-8',
    'Authorization': 'Bearer ' + NOTION_API_KEY,
    'Notion-Version': '2022-06-28',
  };

  // 毎日やるタスクのリスト
  let todo = [
    [
    '読書/十角館',
    '新聞/apple news',
    '新聞/news picks'
  ],[
    '休息',
    '内職',
    '内職'
  ]]

  let i = 0;
  let array = ReciveData(url2, headers);

  for (let item of todo[0]) {
    if(!array.includes(item)) {
      SendData(url, database_id, headers, item, todo[1][i]);
    }
    i++;
  } 
}

function ReciveData(url, headers) {

  let payload = {
    'start_cursor': undefined,
    'filter': {
        'and' : [
          {
            'property': '行動予定日', 
            'date': {
              'is_empty' : true
            }
          },
          {
            "property": "ステータス",
            "status": {
              "equals": "Todo"
            }
          }] 
      }
  }
  
  const opts = {
    'method': 'POST',
    'headers': headers,
    'payload': JSON.stringify(payload),
  };

  let notion_data = UrlFetchApp.fetch(url, opts);
  let tables = JSON.parse(notion_data.getContentText());

  let array =[];
  for(let item of tables.results){
    let name = item.properties['名前'].title[0].plain_text;
    array.push(name);
  }

  return array;
}

function SendData(url, database_id, headers, todo, genre) {
  const payload = {
    'parent': { 'database_id': database_id },
    'properties': {
      '名前': {
        'title': [
          {
            'text': {
              'content': todo
            }
          }
        ]
      },
      "ジャンル": {
        "type": "select",
        "select": {
              "name": genre
        }
      },
      "ステータス": {
            "type": "status",
            "status": {
                "name": "Todo"
            }
        }
    }
  };

  const opts = {
    'method': 'POST',
    'headers': headers,
    'payload': JSON.stringify(payload),
  };

  UrlFetchApp.fetch(url, opts);
}