export const province = [
  '北京市',
  '天津市',
  '上海市',
  '重庆市',
  '河北省',
  '山西省',
  '辽宁省',
  '吉林省',
  '黑龙江省',
  '江苏省',
  '浙江省',
  '安徽省',
  '福建省',
  '江西省',
  '山东省',
  '河南省',
  '湖北省',
  '湖南省',
  '广东省',
  '海南省',
  '四川省',
  '贵州省',
  '云南省',
  '陕西省',
  '甘肃省',
  '青海省',
  '台湾省',
  '内蒙古自治区',
  '广西壮族自治区',
  '西藏自治区',
  '宁夏回族自治区',
  '新疆维吾尔自治区',
  '香港特别行政区',
  '澳门特别行政区',
];

export enum MuseumLevel {
  一级馆,
  二级馆,
  三级馆,
}

export enum ExhibitTimeStatus {
  正在展览,
  即将开展,
  即将结束,
  已经结束,
  免费展览,
  收费展览,
}

export enum MedalMaterial {
  青铜器,
  漆木器,
  金银器,
  竹木简牍,
  玉器,
  '陶、瓷器',
  服饰,
  雕塑造像,
  书画,
  古籍善本,
  工艺美术品,
}

export enum MedalEra {
  新石器时代,
  夏,
  商,
  西周,
  东周,
  春秋,
  战国,
  秦朝,
  西汉,
  东汉,
  三国,
  魏晋南北朝,
  隋朝,
  唐朝,
  五代十国,
  辽,
  北宋,
  南宋,
  金,
  元,
  明,
  清,
  民国,
  近现代,
  当代,
}

export enum ScriptType {
  访古令,
  访古之旅,
}

export enum QuestionDifficulty {
  简单,
  容易,
  一般,
  困难,
  地狱,
}

export enum OrderType {
  精品展览,
  人工讲解,
}

export const CanVerifyOrderType = [OrderType.精品展览, OrderType.人工讲解];

export const OrderResultMap = {
  SUCCESS: '支付成功',
  REFUND: '转入退款',
  NOTPAY: '未支付',
  CLOSED: '已关闭',
  REVOKED: '已撤销（仅付款码支付会返回）',
  USERPAYING: '用户支付中（仅付款码支付会返回）',
  PAYERROR: '支付失败（仅付款码支付会返回）。',
};
export enum ApplyStatus {
  未申请,
  待审核,
  已通过,
  已驳回,
}

export enum ApprovalStatus {
  审核中,
  已通过,
  已驳回,
}

export enum NarratorType {
  一级,
  二级,
  三级,
  四级,
  五级,
}

export function getOptionsFromEnum(params: { [key in string]: string | number }) {
  return Object.entries(params)
    .map(([label, value]) => ({ value, label }))
    .filter((i) => !!isNaN(i.label as any));
}
