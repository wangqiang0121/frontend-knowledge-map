/**
 * this 优先级相关
 * 我们常常把通过 call、apply、bind、new 对 this 绑定的情况称为显式绑定；
 * 根据调用关系确定的 this 指向称为隐式绑定。 */

/**
 * 结论：
 * 箭头函数this绑定不可修改 > new 构造函数修改this > call/apply/bind > 默认绑定（window、global）
 */